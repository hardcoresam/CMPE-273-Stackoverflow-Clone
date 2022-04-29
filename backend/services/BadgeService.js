const { User, Badge, Comment, Post } = require("../models/mysql");
const kafkaConection = require('../kafka/KafkaConnect')
const kafkaTopics = require('../../util/kafkaTopics.json')

exports.checkAndAwardBadges = async (payload) => {
    const { action } = payload;

    if (action === "UPVOTE") {

    }

    if (action === "DOWNVOTE") {

    }

    if (action === "QUESTION_ADDED") {

    }

    if (action === "ANSWER_POSTED") {
        const answerAdded = payload.answer;
        const badge = await Badge.findOne({
            where: {
                name: "Helpfulness",
                user_id: answerAdded.owner_id
            }
        });
        //Already received the highest badge. No need to check further
        if (badge && badge.type === "GOLD") {
            return;
        }

        const noOfAnswers = await Post.count({
            where: {
                type: "ANSWER",
                owner_id: answerAdded.owner_id
            }
        });
        let badgeType;
        if (noOfAnswers <= 2) {
            badgeType = "BRONZE";
        } else if (noOfAnswers > 2 && noOfAnswers < 5) {
            badgeType = "SILVER";
        } else {
            badgeType = "GOLD";
        }

        if (badge === null || badge.type !== badgeType) {
            await new Badge({
                name: "Helpfulness",
                type: badgeType,
                user_id: answerAdded.owner_id
            }).save();
            const badgeTypeCount = badgeType === "BRONZE" ? "bronze_badges_count" : (badgeType === "SILVER" ? "silver_badges_count" : "gold_badges_count");
            await User.increment({ [badgeTypeCount]: 1 }, { where: { id: answerAdded.owner_id } });
        }
    }

    if (action === "QUESTION_VIEWED") {

    }

    if (action === "ACCEPTED_ANSWER") {

    }

    if (action === "COMMENT_ADDED") {
        const commentAdded = payload.comment;
        const badge = await Badge.findOne({
            where: {
                name: "Pundit",
                user_id: commentAdded.user_id
            }
        });
        if (badge === null) {
            const noOfComments = await Comment.count({
                where: {
                    user_id: commentAdded.user_id
                }
            });
            if (noOfComments >= 3) {
                await new Badge({
                    name: "Pundit",
                    type: "SILVER",
                    user_id: commentAdded.user_id
                }).save();
                await User.increment({ silver_badges_count: 1 }, { where: { id: commentAdded.user_id } });
            }
        }
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