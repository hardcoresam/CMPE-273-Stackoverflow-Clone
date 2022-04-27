const kafka = require('./../kafka/kafka')
const actions = require('../../util/kafkaActions.json')
const kafkaTopics = require('../../util/kafkaTopics.json')

exports.createChatRoom = async (req, res) => {  
    kafka.sendKafkaRequest(kafkaTopics.MESSAGES_TOPIC, { ...req.body, action: actions.CREATE_CHAT_ROOM }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.sendMessage = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.MESSAGES_TOPIC, { ...req.body, action: actions.SEND_MESSAGE }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.getMessages = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.MESSAGES_TOPIC, { ...req.body, action: actions.GET_ALL_MESSAGES }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}