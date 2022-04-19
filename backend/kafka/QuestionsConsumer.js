const kafkaConection = require('./KafkaConnect')
const QuestionService = require('../services/QuestionService')
const actions = require('../../util/kafkaActions.json')
const kafkaTopics = require('../../util/kafkaTopics.json')


kafkaConection.getConsumer(kafkaTopics.POSTS_TOPIC, (consumer) => {

    var producer = kafkaConection.getProducer()

    consumer.on('message', function (message) {
        var data = JSON.parse(message.value)
        const { payload, correlationId } = data
        const { action } = payload

        console.log("1. question Data at backend...")

        if (action == actions.ASK_QUESTION) {
            QuestionService.askQuestion(payload, (err, res) => {
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

        if (action == actions.GET_QUESTIONS) {
            QuestionService.getQuestions(payload, (err, res) => {
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

        if (action == actions.GET_QUESTION) {
            console.log("in get question")
            QuestionService.getQuestion(payload, (err, res) => {
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

        if (action == actions.BOOKMARK_QUESTION) {
            console.log("in bookmark question")
            QuestionService.bookmarkQuestion(payload, (err, res) => {
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

        if (action == actions.UNBOOKMARK_QUESTION) {
            console.log("in un bookmark question")
            QuestionService.unbookmarkQuestion(payload, (err, res) => {
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

        if (action == actions.UPVOTE_QUESTION) {
            QuestionService.upvoteQuestion(payload, (err, res) => {
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

        if (action == actions.DOWNVOTE_QUESTION) {
            QuestionService.downvoteQuestion(payload, (err, res) => {
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