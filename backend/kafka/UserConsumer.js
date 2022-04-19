const kafkaConection = require('./KafkaConnect')
const UserService = require('../services/UserService')
const actions = require('../../util/kafkaActions.json')
const kafkaTopics = require('../../util/kafkaTopics.json')

kafkaConection.getConsumer(kafkaTopics.USERS_TOPIC, (consumer) => {

    var producer = kafkaConection.getProducer()

    consumer.on('message', function (message) {
        var data = JSON.parse(message.value)
        const { payload, correlationId } = data
        const { action } = payload

        console.log("1. Cosumed Data at backend...")

        if (action == actions.REGISTER_USER) {
            UserService.createUser(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                let payloads = [
                    { topic: kafkaTopics.ACKNOWLEDGE_TOPIC, messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("2. Sent Acknowledegemt ...\n", data)
                })
            })
        }

        if (action == actions.LOGIN) {
            UserService.login(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                let payloads = [
                    { topic: kafkaTopics.ACKNOWLEDGE_TOPIC, messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("2. Sent Acknowledegemt ...\n", data)
                })
            })
        }
    })
})