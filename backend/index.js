const express = require('express')
const app = express()
const db = require('./models');
const dotenv = require('dotenv')
//const passport = require('passport')

dotenv.config();

const PORT = process.env.PORT || 5000

app.use(express.json())

//app.use(passport.initialize())

const kafkaConection = require('./kafka/KafkaConnect')
const kafkaTopics = require('../util/kafkaTopics.json')
const UserService = require('./services/UserService')
const QuestionService = require('./services/QuestionService')

function handleTopicRequest(topic_name, serviceObject) {
    kafkaConection.getConsumer(topic_name, (consumer) => {
        var producer = kafkaConection.getProducer()

        consumer.on('message', function (message) {
            var data = JSON.parse(message.value)
            const { payload, correlationId } = data
            console.log("1. Consumed Data at backend...")

            serviceObject.handle_request(payload, (err, res) => {
                let payload = {
                    correlationId: correlationId
                }
                if (err) {
                    console.log("Service failed with Error: ", err);
                    payload.status = 400;
                    payload.content = err;
                }

                if (res) {
                    payload.status = 200;
                    payload.content = res;
                }

                //Send Response to acknowledge topic
                let payloadForProducer = [
                    {
                        topic: kafkaTopics.ACKNOWLEDGE_TOPIC,
                        messages: JSON.stringify({ "acknowledgementpayload": true, payload }),
                        partition: 0
                    }
                ];
                producer.send(payloadForProducer, (err, data) => {
                    if (err) throw err
                    console.log("2. Sent Acknowledgement ...\n", data)
                })
            })
        })
    })
}

handleTopicRequest(kafkaTopics.USERS_TOPIC, UserService);
handleTopicRequest(kafkaTopics.POSTS_TOPIC, QuestionService);

db.sequelize.sync().then((req) => {
    app.listen(8585, (req, res) => {
        console.log("Server running on port 8585")
    });
})