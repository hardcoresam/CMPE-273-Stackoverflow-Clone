const kafka = require('./../kafka/kafka')
const actions = require('../../util/kafkaActions.json')
const kafkaTopics = require('../../util/kafkaTopics.json')

exports.createChatRoom = async (req, res) => {
    const errors = (req);
    
    kafka.sendKafkaRequest(kafkaTopics.USERS_TOPIC, { ...req.body, action: actions.CREATE_CHAT_ROOM }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}