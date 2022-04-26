const db = require('../models/mysql')
const Post = db.Post
const sequelize = require('sequelize')
const actions = require('../../util/kafkaActions.json')

exports.handle_request = (payload, callback) => {
    const { action } = payload;
    switch (action) {
        case actions.ASK_QUESTION:
            askQuestion(payload, callback);
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
        case actions.UPVOTE_QUESTION:
            upvoteQuestion(payload, callback);
            break;
        case actions.DOWNVOTE_QUESTION:
            downvoteQuestion(payload, callback);
            break;
    }
};


const askQuestion = async (payload, cb) => {
    try {
        // const {firstName,lastName,email,password,title} = payload        
        console.log(payload)
        Post.create(payload).then(data => {
            cb(null, data)
        })
            .catch(err => {
                cb(err, null)
            })
    } catch (error) {
        cb(error, null)
    }
}

const getQuestions = async (payload, cb) => {
    try {
        // const {firstName,lastName,email,password,title} = payload
        const data = await db.sequelize.query("SELECT * FROM `Posts`")
        if (data) {
            console.log("find questions")
            console.log(data)
            cb(null, data[0])
        }
        else cb(err, null)
    } catch (error) {
        cb(error, null)
    }
}

const getQuestion = async (payload, cb) => {
    try {
        // const {firstName,lastName,email,password,title} = payload
        const data = await Post.findOne({ where: { id: payload.questionId } });
        if (data) {
            console.log("find questions")
            console.log(data.dataValues)
            cb(null, data.dataValues)
        }
        else cb(err, null)
    } catch (error) {
        cb(error, null)
    }
}

const bookmarkQuestion = async (payload, cb) => {
    try {
        // const {firstName,lastName,email,password,title} = payload
        // const data = await Post.findOne({ where: { id: payload.questionId } });
        const data = await Post.update({ Bookmark_Status: true }, {
            where: {
                id: payload.questionId
            }
        });
        if (data) {
            console.log("find questions")
            console.log(data)
            cb(null, data)
        }
        else cb(err, null)
    } catch (error) {
        cb(error, null)
    }
}

const unbookmarkQuestion = async (payload, cb) => {
    try {
        // const {firstName,lastName,email,password,title} = payload
        // const data = await Post.findOne({ where: { id: payload.questionId } });
        const data = await Post.update({ Bookmark_Status: false }, {
            where: {
                id: payload.questionId
            }
        });
        if (data) {
            console.log("find questions")
            console.log(data)
            cb(null, data)
        }
        else cb(err, null)
    } catch (error) {
        cb(error, null)
    }
}

const upvoteQuestion = async (payload, cb) => {
    try {
        // const {firstName,lastName,email,password,title} = payload
        // const data = await Post.findOne({ where: { id: payload.questionId } });
        const questiondata = await Post.findOne({ where: { id: payload.questionId } });

        const data = await Post.update({ Upvotes_Count: questiondata.dataValues.Upvotes_Count + 1 }, {
            where: {
                id: payload.questionId
            }
        });
        if (data) {
            console.log("find questions")
            console.log(data)
            cb(null, data)
        }
        else cb(err, null)
    } catch (error) {
        cb(error, null)
    }
}

const downvoteQuestion = async (payload, cb) => {
    try {
        // const {firstName,lastName,email,password,title} = payload
        // const data = await Post.findOne({ where: { id: payload.questionId } });
        const questiondata = await Post.findOne({ where: { id: payload.questionId } });

        const data = await Post.update({ Upvotes_Count: questiondata.dataValues.Upvotes_Count - 1 }, {
            where: {
                id: payload.questionId
            }
        });
        if (data) {
            console.log("find questions")
            console.log(data)
            cb(null, data)
        }
        else cb(err, null)
    } catch (error) {
        cb(error, null)
    }
}