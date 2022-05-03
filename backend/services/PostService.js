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
            postActivity(payload, callback)
            break
        case actions.ACCEPT_ANSWER:
            acceptAnswer(payload, callback)
            break
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