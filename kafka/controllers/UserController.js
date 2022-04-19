const kafka = require('./../kafka/kafka')
const actions = require('../../util/kafkaActions.json')
const kafkaTopics = require('../../util/kafkaTopics.json')

exports.createUser = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.USERS_TOPIC, { ...req.body, action: actions.REGISTER_USER }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        return res.json(data)
    })
}

exports.login = async (req, res) => {
    kafka.sendKafkaRequest(kafkaTopics.USERS_TOPIC, { ...req.body, action: actions.LOGIN }, (err, data) => {
        if (err) return res.status(400).json({ message: err })
        res.cookie('access-token', data.token, { maxAge: 9000000, httpOnly: false });
        return res.json(data)
    })
}