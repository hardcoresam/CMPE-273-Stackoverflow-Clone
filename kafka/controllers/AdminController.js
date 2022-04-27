const kafka = require('./../kafka/kafka')
const actions = require('../../util/kafkaActions.json')
const kafkaTopics = require('../../util/kafkaTopics.json')

exports.newTag = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.TAGS_TOPIC, { ...req.body, action: actions.NEW_TAG }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.getPendingApprovalQuestions = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, action: actions.PENDING_APPROVAL_QUESTIONS }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.approveQuestion = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.POSTS_TOPIC, { ...req.body, action: actions.APPROVE_QUESTION }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}