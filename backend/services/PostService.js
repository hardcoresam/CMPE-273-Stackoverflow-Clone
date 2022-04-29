const { Post, Bookmark, Comment, User, Tag, PostTag, Vote } = require("../models/mysql");
const { sequelize, Sequelize } = require("../models/mysql/index");
const PostHistory = require("../models/mongodb/PostHistory");
const ReputationHistory = require('./../models/mongodb/ReputationHistory')
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
        case actions.GET_QUESTIONS:
            getQuestions(payload, callback);
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

    return callback(null, newAnswer);
}

const getQuestions = async (payload, callback) => {
    const questions = await Post.findAll({
        where: { type: "QUESTION" }, include: {
            model: User,
            attributes: ['id', 'username', 'photo', 'reputation']
        }
    });
    return callback(null, questions);
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

    //TODO - Sai Krishna - Need to call badge calculation logic here
    return callback(null, newComment);
}

const votePost = async (payload, callback) => {
    let sqlQuery = "update post set score = :score where id = :postId"
    const data = await sequelize.query(sqlQuery, {
        replacements: { score: payload.score, postId: payload.params.postId },
        type: Sequelize.QueryTypes.UPDATE
    });
    callback(null, data)
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
            let sqlQuery = "update post set accepted_answer_id = :answerId where id = :questionId"
            const data = await sequelize.query(sqlQuery, {
                replacements: { answerId: answerId, questionId: answer.parent_id },
                type: Sequelize.QueryTypes.UPDATE
            });


            //Check for previous accepted answers and decrement repuation score -15
            const question = await Post.findOne({ where: { id: answer.parent_id } })
            if (question.accepted_answer_id) {
                const previous_accepted_answer = await Post.findOne({ where: { id: question.accepted_answer_id } })
                const previous_user = await User.findOne({ where: { id: previous_accepted_answer.owner_id } })
                const decrementReputaionQuery = 'update user set reputation = :oldReputation where id = :userId'
                console.log("Previous user", previous_user)
                const data = await sequelize.query(decrementReputaionQuery, {
                    replacements: { oldReputation: previous_user.reputation - 15, userId: previous_user.id },
                    type: Sequelize.QueryTypes.UPDATE
                });
            }

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
                if (res) return callback(null, "Accepted answer")
            })
        } catch (error) {
            console.log(error)
            callback({ errors: { name: { msg: "Failed to accept the answer, try again!" } } }, null)
        }

    }
}