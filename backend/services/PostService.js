const { Post, Bookmark, Comment, User } = require("../models/mysql");
const { sequelize, Sequelize } = require("../models/mysql/index");
const PostHistory = require("../models/mongodb/PostHistory");
const actions = require('../../util/kafkaActions.json');
const elastClient = require('./../config/ElasticClient');
const PostTag = require("../models/MySql/PostTag");

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
            postActivity(payload,callback)
            break
    }
};

const createQuestion = async (payload, callback) => {

    //create record in post
    //in PostTag
    //post activiy

    let status = (payload.isImage !== undefined) ? "PENDING" : "ACTIVE"
    const newQuestion = await new Post({ ...payload, owner_id: payload.USER_ID, status: status }).save();
    return callback(null, newQuestion);
}

const createAnswer = async (payload, callback) => {

    //post history insert a record

    const newAnswer = await new Post({ ...payload, owner_id: payload.USER_ID }).save();
    let sqlQuery = "update post set answers_count = :answerCount where id = :questionId"
    await sequelize.query(sqlQuery, {
        replacements: { answerCount: payload.answers_count + 1, questionId: payload.question_id },
        type: Sequelize.QueryTypes.UPDATE
    });
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


    //join post and user
    //call bookmark
    //call vote
    //comments table
    //asnwers
    //comments for answers
    //increase the view count

    let data = await Post.findOne(
        {
            where: {id: payload.params.questionId}, include: {
                model: User,
                attrbutes: ['id', 'username', 'photo', 'reputation', 'gold_badges_count', 'silver_badges_count', 'bronze_badges_count' ]
            }
        }
    )
    console.log(data)
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
    
    callback(null, { ...data, bookmarked: isBookmark });
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

const postActivity = async (payload,callback) => {
    const postId = payload.params.postId
    const postHistory = await PostHistory.find({post_id:postId}).exec() 
    return callback(null,postHistory)
}