const db = require('../models')
const Post = db.Post
const sequelize = require('sequelize')

exports.askQuestion = async (payload,cb) => {
    try {
        // const {firstName,lastName,email,password,title} = payload        
        console.log(payload)
        Post.create(payload).then(data => {
            cb(null,data)
        })
        .catch(err=>{
            cb(err,null)
        })
    } catch (error) {
        cb(error,null)
    } 
}

exports.getQuestions = async (payload,cb) => {
    try {
        // const {firstName,lastName,email,password,title} = payload
        const data = await db.sequelize.query("SELECT * FROM `Posts`")
        if(data) {
            console.log("find questions")
            console.log(data)
            cb(null,data[0])
        }
        else cb(err,null)
    } catch (error) {
        cb(error,null)
    } 
}

exports.getQuestion = async (payload,cb) => {
    try {
        // const {firstName,lastName,email,password,title} = payload
        const data = await Post.findOne({ where: { id: payload.questionId } });
        if(data) {
            console.log("find questions")
            console.log(data.dataValues)
            cb(null,data.dataValues)
        }
        else cb(err,null)
    } catch (error) {
        cb(error,null)
    } 
}

exports.bookmarkQuestion = async (payload,cb) => {
    try {
        // const {firstName,lastName,email,password,title} = payload
        // const data = await Post.findOne({ where: { id: payload.questionId } });
        const data = await Post.update({ Bookmark_Status: true }, {
            where: {
                id: payload.questionId
            }
          });
        if(data) {
            console.log("find questions")
            console.log(data)
            cb(null,data)
        }
        else cb(err,null)
    } catch (error) {
        cb(error,null)
    } 
}