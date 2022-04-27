const kafka = require('../kafka/kafka')
const actions = require('../../util/kafkaActions.json')
const kafkaTopics = require('../../util/kafkaTopics.json')

exports.createQuestion = async (req, res) => {
    console.log("in create question")
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, action: actions.ASK_QUESTION }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.getQuestions = async (req, res) => {
    console.log("get questions")
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, action: actions.GET_QUESTIONS }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.getQuestion = async (req, res) => {
    console.log("get question")
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, params: req.params, action: actions.GET_QUESTION }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.bookmarkQuestion = async (req, res) => {
    console.log("bookmark question")
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, params: req.params, action: actions.BOOKMARK_QUESTION }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.unbookmarkQuestion = async (req,res) => {
    console.log("un bookmark question")
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC,{...req.body, params: req.params, action:actions.UNBOOKMARK_QUESTION},(err,data) => {
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.votePost = async (req,res) => {
    console.log("up question")
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC,{...req.body, params: req.params, action:actions.VOTE_POST},(err,data) => {
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.addComment = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, params: req.params, action: actions.ADD_COMMENT }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.postActivity = async (req,res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, params: req.params, action: actions.POST_ACTIVITY }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}