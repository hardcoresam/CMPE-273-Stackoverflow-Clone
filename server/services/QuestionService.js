const db = require('./../models')
const Post = db.Post

exports.askQuestion = async (payload,cb) => {
    try {
        // const {firstName,lastName,email,password,title} = payload
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