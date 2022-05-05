const { Post, Bookmark, Comment, User, Tag, PostTag, Vote } = require("../models/mysql");
const { sequelize, Sequelize } = require("../models/mysql/index");
const PostHistory = require("../models/mongodb/PostHistory");
const ReputationHistory = require('./../models/mongodb/ReputationHistory');
const BadgeService = require('./BadgeService');
const actions = require('../../util/kafkaActions.json');
const elastClient = require('./../config/ElasticClient');

exports.handle_request = (payload, callback) => {
    const { action } = payload;
    switch (action) {
        case actions.ASK_QUESTION:
            createQuestion(payload, callback);
            break;
        case actions.WRITE_ANSWER:
            createAnswer(payload, callback);
            break;
        case actions.GET_QUESTIONS_FOR_DASHBOARD:
            getQuestionsForDashboard(payload, callback);
            break;
        case actions.GET_QUESTION:
            getQuestion(payload, callback);
            break;
        case actions.BOOKMARK_QUESTION:
            bookmarkQuestion(payload, callback);
            break;
        case actions.UNBOOKMARK_QUESTION:
            unbookmarkQuestion(payload, callback);
            break;
        case actions.VOTE_POST:
            votePost(payload, callback);
            break;
        case actions.ADD_COMMENT:
            addComment(payload, callback);
            break;
        case actions.POST_ACTIVITY:
            postActivity(payload, callback);
            break;
        case actions.ACCEPT_ANSWER:
            acceptAnswer(payload, callback);
            break;
        case actions.UPDATE_QUESTION:
            updateQuestion(payload, callback);
            break;
        case actions.SEARCH:
            search(payload, callback);
            break;
        case actions.ADMIN_STATS:
            getAdminStats(payload, callback);
            break;
    }
};

const createQuestion = async (payload, callback) => {

    let tags = payload.tags
    var tagArr = tags.split(',');

    let status = (payload.isImage !== undefined) ? "PENDING" : "ACTIVE"
    const newQuestion = await new Post({ ...payload, owner_id: payload.USER_ID, status: status }).save();

    for (let i = 0; i < tagArr.length; i++) {
        let data = await Tag.findOne({ where: { name: tagArr[i] } });
        await new PostTag({
            post_id: newQuestion.id,
            tag_id: data.id,
            created_date: Date.now()
        }).save()
    }
    const loggedInUser = await User.findOne({
        where: { id: payload.USER_ID },
        attrbutes: ['username']
    });
    await new PostHistory({
        post_id: newQuestion.id,
        user_id: payload.USER_ID,
        user_display_name: loggedInUser.username,
        comment: payload.title,
        type: "QUESTION_ASKED"
    }).save();

    BadgeService.pushIntoBadgeTopic({ action: "QUESTION_POSTED", postedUserId: loggedInUser.id });
    return callback(null, newQuestion);
}

const createAnswer = async (payload, callback) => {

    const newAnswer = await new Post({ ...payload, owner_id: payload.USER_ID }).save();
    let sqlQuery = "update post set answers_count = :answerCount where id = :questionId"
    await sequelize.query(sqlQuery, {
        replacements: { answerCount: payload.answers_count + 1, questionId: payload.parent_id },
        type: Sequelize.QueryTypes.UPDATE
    });

    const loggedInUser = await User.findOne({
        where: { id: payload.USER_ID },
        attrbutes: ['username']
    });

    await new PostHistory({
        post_id: newAnswer.id,
        user_id: payload.USER_ID,
        user_display_name: loggedInUser.username,
        comment: payload.body,
        type: "ANSWER_POSTED"
    }).save();

    BadgeService.pushIntoBadgeTopic({ action: "ANSWER_POSTED", answeredUserId: newAnswer.owner_id });
    return callback(null, newAnswer);
}

const getQuestionsForDashboard = async (payload, callback) => {
    const filterBy = payload.query.filterBy;
    let whereStatement = {
        type: "QUESTION"
    };
    if (filterBy === 'unanswered') {
        whereStatement.answers_count = 0;
    }
    let orderBy = 'modified_date';
    if (filterBy === 'score' || filterBy === 'unanswered') {
        orderBy = 'score';
    } else if (filterBy === 'hot') {
        orderBy = 'views_count';
    } else if (filterBy === 'interesting') {
        orderBy = 'modified_date';
    }

    const guestionsForDashboard = await Post.findAll({
        where: whereStatement,
        include: {
            model: User,
            attributes: ['id', 'username', 'photo', 'reputation'],
            required: true
        },
        order: [[orderBy, 'DESC']]
    });
    return callback(null, guestionsForDashboard);
}

const getQuestion = async (payload, callback) => {
    let vote = await Vote.findOne({
        where: { post_id: payload.params.questionId, user_id: payload.USER_ID }
    })
    let isUpVote = false
    let isDownVote = false
    console.log(vote)
    if (vote === null) { }
    else if (vote.type === "UPVOTE") isUpVote = true
    else if (vote.type === "DOWNVOTE") isDownVote = true
    let data = await Post.findOne(
        {
            where: { id: payload.params.questionId },
            include: [{
                model: User,
                attrbutes: ['id', 'username', 'photo', 'reputation', 'gold_badges_count', 'silver_badges_count', 'bronze_badges_count']
            }, {
                model: Comment
            },
            {
                model: Post,
                as: "answers", include: {
                    model: Comment
                }
            }
            ]
        }
    )
    data = data.dataValues

    let isBookmark = await Bookmark.findOne({
        where: { user_id: data.owner_id, post_id: payload.params.questionId }
    })

    if (isBookmark == null) isBookmark = false
    else isBookmark = true

    let count = data.views_count + 1;
    let sqlQuery = "update post set views_count = :count where id = :questionId"
    await sequelize.query(sqlQuery, {
        replacements: { count: count, questionId: payload.params.questionId },
        type: Sequelize.QueryTypes.UPDATE
    });

    if (count > 15 || count > 5) {
        BadgeService.pushIntoBadgeTopic({
            action: "QUESTION_VIEWED", viewCount: count,
            ownerId: data.owner_id
        });
    }

    callback(null, { ...data, bookmarked: isBookmark, isUpVote: isUpVote, isDownVote: isDownVote });
}


const bookmarkQuestion = async (payload, callback) => {
    let bookmark = { post_id: payload.params.questionId, user_id: payload.USER_ID }
    const data = await new Bookmark(bookmark).save();
    callback(null, data)
}

const unbookmarkQuestion = async (payload, callback) => {
    let sqlQuery = "delete from bookmark where post_id = :questionId and user_id = :userId"
    const data = await sequelize.query(sqlQuery, {
        replacements: { questionId: payload.params.questionId, userId: payload.USER_ID },
        type: Sequelize.QueryTypes.DELETE
    });
    console.log(data);
    callback(null, "deleted bookmark successfully");
}

const addComment = async (payload, callback) => {
    const loggedInUserId = payload.USER_ID;
    const postId = payload.params.postId;

    const loggedInUser = await User.findOne({
        where: { id: loggedInUserId },
        attrbutes: ['id', 'username']
    });
    const post = await Post.findOne({ where: { id: postId } });
    if (post === null) {
        return callback({ error: "Invalid post id specified" }, null);
    }

    const newComment = await new Comment({
        content: payload.content,
        user_display_name: loggedInUser.username,
        post_id: postId,
        user_id: loggedInUserId
    }).save();

    const postHistory = await new PostHistory({
        post_id: postId,
        user_id: loggedInUserId,
        user_display_name: loggedInUser.username,
        comment: payload.content,
        type: "COMMENT_ADDED"
    }).save();

    BadgeService.pushIntoBadgeTopic({ action: "COMMENT_ADDED", commentedUserId: newComment.user_id });
    return callback(null, newComment);
}

//TODO - @Sai Krishna - Code to write to reputation history table is pending
const votePost = async (payload, callback) => {
    const loggedInUserId = payload.USER_ID;
    const postId = payload.params.postId;
    const voteType = payload.type;
    const post = await Post.findOne({ where: { id: postId } });
    if (post.owner_id === loggedInUserId) {
        return callback({ errors: { vote: { msg: 'You cannot vote on your own posts.' } } }, null);
    }
    const previousVote = await Vote.findOne({
        where: {
            post_id: postId,
            user_id: loggedInUserId
        }
    });

    let repuationToModify;
    let postScoreToModify;
    if (previousVote !== null) {
        //User already has a vote for this post. So, there can be 2 cases here.
        //Case - 1 - User wanting to undo his previous vote.
        //Case - 2 - User wanting to downvote when he already upvoted this post previously
        if (previousVote.type === voteType) {
            if (voteType === "UPVOTE") {
                postScoreToModify = -1;
                repuationToModify = post.type === "QUESTION" ? -10 : -5;
            } else {
                postScoreToModify = 1;
                repuationToModify = post.type === "QUESTION" ? 10 : 5;
            }
        } else {
            if (voteType === "UPVOTE") {
                postScoreToModify = 2;
                repuationToModify = post.type === "QUESTION" ? 20 : 10;
            } else {
                postScoreToModify = -2;
                repuationToModify = post.type === "QUESTION" ? -20 : -10;
            }
            await new Vote({ type: voteType, post_id: postId, user_id: loggedInUserId }).save();
        }
        await Vote.destroy({ where: { id: previousVote.id } });
    } else {
        //User is voting for the first time for this post. So, create a record directly
        if (voteType === "UPVOTE") {
            postScoreToModify = 1;
            repuationToModify = post.type === "QUESTION" ? 10 : 5;
        } else {
            postScoreToModify = -1;
            repuationToModify = post.type === "QUESTION" ? -10 : -5;
        }
        await new Vote({ type: voteType, post_id: postId, user_id: loggedInUserId }).save();
    }
    await Post.increment({ score: postScoreToModify }, { where: { id: post.id } });
    await User.increment({ reputation: repuationToModify }, { where: { id: post.owner_id } });

    if (voteType === "UPVOTE") {
        BadgeService.pushIntoBadgeTopic({ action: "UPVOTE", postId: postId, upvotedUserId: loggedInUserId });
    } else {
        BadgeService.pushIntoBadgeTopic({ action: "DOWNVOTE", downvotedUserId: loggedInUserId });
    }
    return callback(null, { message: "Voted successfully" });
}

const postActivity = async (payload, callback) => {
    const postId = payload.params.postId
    const postHistory = await PostHistory.find({ post_id: postId }).exec()
    return callback(null, postHistory)
}

const acceptAnswer = async (payload, callback) => {
    const { answerId } = payload
    const answer = await Post.findOne({
        where:
        {
            id: answerId
        }
    })
    if (answer) {
        try {
            //Check for previous accepted answers and decrement repuation score -15
            const question = await Post.findOne({ where: { id: answer.parent_id } })
            if (question.accepted_answer_id) {
                const previous_accepted_answer = await Post.findOne({ where: { id: question.accepted_answer_id } })
                const previous_user = await User.findOne({ where: { id: previous_accepted_answer.owner_id } })
                const decrementReputaionQuery = 'update user set reputation = :oldReputation where id = :userId'
                var new_rep = previous_user.reputation - 15
                if (previous_user.reputation < 15) {
                    new_rep = 0
                }
                const data = await sequelize.query(decrementReputaionQuery, {
                    replacements: { oldReputation: new_rep, userId: previous_user.id },
                    type: Sequelize.QueryTypes.UPDATE
                });
            }

            //update accepeted answer id
            let sqlQuery = "update post set accepted_answer_id = :answerId where id = :questionId"
            const data = await sequelize.query(sqlQuery, {
                replacements: { answerId: answerId, questionId: answer.parent_id },
                type: Sequelize.QueryTypes.UPDATE
            });

            //+15 to reputation score
            const user = await User.findOne({ where: { id: answer.owner_id } })
            let userQuery = "update user set reputation = :newReputation where id = :userId"
            const data1 = await sequelize.query(userQuery, {
                replacements: { newReputation: user.reputation + 15, userId: user.id },
                type: Sequelize.QueryTypes.UPDATE
            });

            //log repuation data
            const reputationdata = new ReputationHistory({
                post_id: answer.parent_id,
                post_title: answer.title,
                user_id: answer.owner_id,
                type: "ACCEPTED_ANSWER"
            })
            await reputationdata.save((err, res) => {
                if (err) throw err
                if (res) {
                    BadgeService.pushIntoBadgeTopic({
                        action: "ACCEPTED_ANSWER",
                        userId: user.id, newReputation: user.reputation + 15
                    });
                    return callback(null, "Accepted answer")
                }
            })
        } catch (error) {
            return callback({ errors: { name: { msg: "Failed to accept the answer, try again!" } } }, null)
        }
    } else {
        return callback({ errors: { name: { msg: "No such answer found, try again!" } } }, null)
    }
}

const updateQuestion = async (payload, callback) => {
    const { title, body } = payload
    let data = await Post.findOne({ where: { id: payload.params.questionId } })
    data = data.dataValues
    if (data.owner_id == payload.USER_ID) {
        let updateddata = await Post.update(
            { title: title, body: body },
            { where: { id: data.id } }
        )
        return callback(null, updateddata);
    }
    else return callback({ errors: { name: { msg: "Error in updating the question" } } }, null)
}

//TODO - Exception handling for bad user input
const search = async (payload, callback) => {
    let orderBy = 'score';
    if (payload.query.orderBy && payload.query.orderBy === 'newest') {
        orderBy = 'created_date';
    }
    const fullSearchString = payload.searchString;
    const searchType = fullSearchString.substring(0, fullSearchString.indexOf(' '));
    const searchString = fullSearchString.substring(fullSearchString.indexOf(' ') + 1);
    let exactSearchString = '%' + searchString + '%';
    let resultString;
    let searchOptionsString;
    let tagDescription;
    let whereStatement = {};
    let includeStatement = [{
        model: Post,
        as: "question",
    }, {
        model: User,
        attributes: ['id', 'username', 'photo', 'reputation'],
        required: true
    }];

    if (searchType.startsWith('[')) {
        let tagName = searchType.slice(1, -1);
        const tag = await Tag.findOne({ where: { name: tagName } });
        if (tag === null) {
            return callback({ error: `Invalid tag name ${tagName} specified while searching` }, null);
        }
        resultString = "Results for " + searchString + " tagged with " + tagName;
        searchOptionsString = "Search options not deleted";
        tagDescription = tag.description;
        includeStatement.push({
            model: Tag,
            where: {
                id: tag.id
            },
            required: true
        });
    } else if (searchType.startsWith('is:')) {
        let postType = searchType.slice(3);
        resultString = "Results for " + searchString;
        searchOptionsString = "Search options " + postType + "s" + " only not deleted";
        if (!(postType === "question" || postType === "answer")) {
            return callback({ error: `Invalid posttype ${postType} specified while searching` }, null);
        }
        whereStatement.type = postType.toUpperCase();
    } else if (searchType.startsWith('user:')) {
        let userId = searchType.slice(5);
        resultString = "Results for " + searchString;
        searchOptionsString = "Search options not deleted user " + userId;
        const user = await User.findOne({ where: { id: userId } });
        if (user === null) {
            return callback({ error: `Invalid userId ${userId} specified while searching` }, null);
        }
        whereStatement.owner_id = userId;
    } else if (searchType.startsWith('isaccepted:')) {
        let str = searchType.slice(11);
        if (!(str === "yes" || str === "no")) {
            return callback({ error: `Invalid parameter ${str} specified while searching` }, null);
        }
        let searchWithAcceptedPosts = str === "yes" ? true : false;
        //TODO - @Sai Krishna - This is pending. Need to complete


    } else {
        resultString = "Results for " + fullSearchString;
        searchOptionsString = "Search options not deleted";
        if (fullSearchString.startsWith('"')) {
            exactSearchString = '%' + fullSearchString.slice(1, -1) + '%';
        } else {
            exactSearchString = '%' + fullSearchString + '%';
        }
    }

    whereStatement[Sequelize.Op.or] = [
        { title: { [Sequelize.Op.like]: exactSearchString } },
        { body: { [Sequelize.Op.like]: exactSearchString } }
    ];
    const posts = await Post.findAll({
        where: whereStatement,
        include: includeStatement,
        order: [[orderBy, "DESC"]]
    });

    return callback(null, { posts, resultString, searchOptionsString, tagDescription });
}

const getAdminStats = async (payload, callback) => {
    //The number of questions posted per day
    const noOfQuestionsPerDaySql = "select DATE(created_date) as post_created_date, count(*) as posts_count " +
        "from post p group by post_created_date order by post_created_date desc limit 10";
    const noOfQuestionsPerDaySqlResults = await sequelize.query(noOfQuestionsPerDaySql, {
        type: Sequelize.QueryTypes.SELECT
    });

    //Top 10 most viewed questions
    const topTenViewedQuestions = await Post.findAll({
        where: { type: "QUESTION" },
        order: [['views_count', 'DESC']],
        limit: 10
    });

    //Top 10 most used tags
    const topTenTagsSql = "select pt.tag_id, t.name, count(p.id) as no_of_questions from post p inner join " +
        "post_tag pt on p.id = pt.post_id inner join tag t on t.id = pt.tag_id where p.type = 'QUESTION' " +
        "group by pt.tag_id order by no_of_questions desc";
    const topTenTagsSqlResults = await sequelize.query(topTenTagsSql, {
        type: Sequelize.QueryTypes.SELECT
    });

    //Top 10 users with highest reputation
    const topTenUsers = await User.findAll({
        where: { is_admin: false },
        order: [['reputation', 'DESC']],
        limit: 10
    });

    //Top 10 users with lowest reputation
    const leastTenUsers = await User.findAll({
        where: { is_admin: false },
        order: [['reputation', 'ASC']],
        limit: 10
    });

    return callback(null, {
        noOfQuestionsPerDay: noOfQuestionsPerDaySqlResults,
        topTenViewedQuestions,
        topTenTags: topTenTagsSqlResults,
        topTenUsers,
        leastTenUsers
    });
}