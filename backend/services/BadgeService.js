const kafkaConection = require('../kafka/KafkaConnect')
const kafkaTopics = require('../../util/kafkaTopics.json')

exports.checkAndAwardBadges = (payload) => {
    const { action } = payload;

    if (action === "UPVOTE") {

    }

    if (action === "DOWNVOTE") {

    }

    if (action === "QUESTION_ADDED") {

    }

    if (action === "ANSWER_POSTED") {

    }

    if (action === "QUESTION_VIEWED") {

    }

    if (action === "ACCEPTED_ANSWER") {

    }

    if (action === "COMMENT_ADDED") {

    }

    //Not that important
    if (action === "QUESTION_EDITED") {

    }
}

exports.startBadgeConsumer = () => {
    const badgeConsumer = kafkaConection.getConsumerForBadges(kafkaTopics.BADGE_CALCULATIONS_TOPIC);
    badgeConsumer.on('message', (message) => {
        var data = JSON.parse(message.value);
        const { payload } = data;
        console.log("Message received in badges topic with payload: ", payload);
        this.checkAndAwardBadges(payload);
    });
}

exports.pushIntoBadgeTopic = (payload) => {
    var producer = kafkaConection.getProducer();
    producer.on('ready', () => {
        let payloadForProducer = [
            { topic: kafkaTopics.BADGE_CALCULATIONS_TOPIC, messages: JSON.stringify({ payload }), partition: 0 }
        ];
        producer.send(payloadForProducer, (err, data) => {
            if (err) console.log("ERR - ", err)
            else console.log("DATA - ", data)
        })
    })
}