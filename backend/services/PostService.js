const { Post, Bookmark, Comment, User } = require("../models/mysql");
const { sequelize, Sequelize } = require("../models/mysql/index");
const PostHistory = require("../models/mongodb/PostHistory");
const actions = require('../../util/kafkaActions.json');
const elastClient = require('./../config/ElasticClient')

exports.handle_request = (payload, callback) => {
    const { action } = payload;
    switch (action) {
        case actions.ASK_QUESTION:
            createQuestion(payload, callback);
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
            postActivity(payload,callback)
            break
    }
};

const createQuestion = async (payload, callback) => {
    let status = (payload.isImage !== undefined) ? "PENDING" : "ACTIVE"
    const newQuestion = await new Post({ ...payload, owner_id: payload.USER_ID, status: status }).save();
    return callback(null, newQuestion);
}

// const createQuestion = async (payload, callback) => {
//     let status = (payload.isImage !== undefined) ? "PENDING" : "ACTIVE"
    
//     elastClient.index({
//         index:'posts',
//         body:{ ...payload, owner_id: payload.USER_ID, status: status }
//     }).then(async resp=> {
//         const newQuestion = await new Post({ ...payload, owner_id: payload.USER_ID, status: status }).save();
//         return callback(null, newQuestion);
//     }).catch(err=>{
//         return callback({ errors: { name: { msg: 'Error creating new Post' } } },null)
//     })
    
// }

const getQuestions = async (payload, callback) => {
    const questions = await Post.findAll({
        where: { type: "QUESTION" }
    });
    return callback(null, questions);
}

const getQuestion = async (payload, callback) => {
    const data = await Post.findOne({ where: { id: payload.params.questionId } });
    let count = data.views_count + 1;
    let sqlQuery = "update post set views_count = :count where id = :questionId"
    await sequelize.query(sqlQuery, {
        replacements: { count: count, questionId: payload.params.questionId },
        type: Sequelize.QueryTypes.UPDATE
    });
    callback(null, data);
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

// const votePost = async (payload, callback) => {
//     // const data = await Post.update({ score: payload.score }, {
//     //     where: {
//     //         id: payload.params.postId
//     //     }
//     // });
//     let sqlQuery = "update post set score = :score where id = :postId"
//     const data = await sequelize.query(sqlQuery, {
//         replacements: { score: score, postId: payload.params.postId },
//         type: Sequelize.QueryTypes.UPDATE
//     });
//     callback(null, data)
// }

const postActivity = async (payload,callback) => {
    const postId = payload.params.postId
    const postHistory = await PostHistory.find({post_id:postId}).exec() 
    return callback(null,postHistory)
}