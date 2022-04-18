const db = require('./../models')
const Post = db.Post

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
        Post.findAll().then(data => {
            console.log("find questions")
            console.log(data)
            cb(null,data)
        })
        .catch(err=>{
            cb(err,null)
        })
    } catch (error) {
        cb(error,null)
    } 
}