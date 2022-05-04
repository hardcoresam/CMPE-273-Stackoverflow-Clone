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

exports.createAnswer = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, action: actions.WRITE_ANSWER }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.getQuestionsForDashboard = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, query: req.query, action: actions.GET_QUESTIONS_FOR_DASHBOARD }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.getQuestion = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, params: req.params, action: actions.GET_QUESTION }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.bookmarkQuestion = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, params: req.params, action: actions.BOOKMARK_QUESTION }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.unbookmarkQuestion = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, params: req.params, action: actions.UNBOOKMARK_QUESTION }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.votePost = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, params: req.params, action: actions.VOTE_POST }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.addComment = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, params: req.params, action: actions.ADD_COMMENT }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.postActivity = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, params: req.params, action: actions.POST_ACTIVITY }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.acceptAnswer = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, params: req.params, action: actions.ACCEPT_ANSWER }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.updateQuestion = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, params: req.params, action: actions.UPDATE_QUESTION }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.search = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, query: req.query, action: actions.SEARCH }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}