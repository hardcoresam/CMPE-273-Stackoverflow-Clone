const { User, Badge, Comment, Post, Tag, Vote } = require("../models/mysql");
const { sequelize, Sequelize } = require("../models/mysql/index");
const kafkaConection = require('../kafka/KafkaConnect')
const kafkaTopics = require('../../util/kafkaTopics.json')

//TODO - Only tag based badges should be revoked if they are not eligible anymore but keep this for the end.
exports.checkAndAwardBadges = async (payload) => {
    const { action } = payload;
    var badgeType;

    if (action === "UPVOTE") {
        const votedPost = await Post.findOne({
            where: { id: payload.postId },
            attributes: ["id", "type", "score", "owner_id"],
            include: [
                {
                    model: Tag,
                    attributes: ["id", "name"]
                },
                {
                    model: User,
                    attributes: ["id", "reputation"],
                    required: true
                }
            ]
        });
        let tagIds = [];
        for (const tag of votedPost.Tags) {
            tagIds.push(tag.id);
        }

        //Need to check the tag score for all the tags present in the upvoted post and then award tag badges
        if (tagIds.length > 0 && votedPost.type === "QUESTION") {
            let sqlQuery = "select pt.tag_id, t.name, sum(p.score) as score from post p inner join post_tag pt " +
                "on p.id = pt.post_id inner join tag t on pt.tag_id = t.id where p.owner_id = :owner_id " +
                "and p.type = 'QUESTION' and pt.tag_id in (:tagIds) group by pt.tag_id";
            const sqlResults = await sequelize.query(sqlQuery, {
                replacements: { owner_id: votedPost.owner_id, tagIds: tagIds },
                type: Sequelize.QueryTypes.SELECT
            });

            for (const result of sqlResults) {
                var tagScore = result.score;
                badgeType = tagScore <= 10 ? "BRONZE" : (tagScore <= 15 ? "SILVER" : "GOLD");
                createBadgeIfNotPresent(result.name, badgeType, votedPost.owner_id);
            }
        }

        //Need to check for "Popular" badge based on user's reputation
        const userReputation = votedPost.User.reputation;
        badgeType = userReputation <= 10 ? "BRONZE" : (userReputation < 15 ? "SILVER" : "GOLD");
        createBadgeIfNotPresent("Popular", badgeType, votedPost.owner_id);

        //Need to check for "Sportsmanship" badge based on no of upvotes
        const noOfUpvotes = await Vote.count({ where: { type: "UPVOTE", user_id: payload.upvotedUserId } });
        badgeType = noOfUpvotes <= 2 ? "BRONZE" : (noOfUpvotes < 5 ? "SILVER" : "GOLD");
        createBadgeIfNotPresent("Sportsmanship", badgeType, payload.upvotedUserId);
    }

    if (action === "DOWNVOTE") {
        const noOfDownvotes = await Vote.count({ where: { type: "DOWNVOTE", user_id: payload.downvotedUserId } });
        badgeType = noOfDownvotes <= 2 ? "BRONZE" : (noOfDownvotes < 5 ? "SILVER" : "GOLD");
        createBadgeIfNotPresent("Critic", badgeType, payload.downvotedUserId);
    }

    if (action === "QUESTION_POSTED") {
        const noOfQuestions = await Post.count({ where: { type: "QUESTION", owner_id: payload.postedUserId } });
        badgeType = noOfQuestions <= 2 ? "BRONZE" : (noOfQuestions < 5 ? "SILVER" : "GOLD");
        createBadgeIfNotPresent("Curious", badgeType, payload.postedUserId);
    }

    if (action === "ANSWER_POSTED") {
        const noOfAnswers = await Post.count({ where: { type: "ANSWER", owner_id: payload.answeredUserId } });
        badgeType = noOfAnswers <= 2 ? "BRONZE" : (noOfAnswers < 5 ? "SILVER" : "GOLD");
        createBadgeIfNotPresent("Helpfulness", badgeType, payload.answeredUserId);
    }

    if (action === "QUESTION_VIEWED") {
        createBadgeIfNotPresent(payload.viewCount > 15 ? "Famous Question" :
            "Notable Question", "GOLD", payload.ownerId);
    }

    if (action === "ACCEPTED_ANSWER") {
        badgeType = payload.newReputation <= 10 ? "BRONZE" : (payload.newReputation < 15 ? "SILVER" : "GOLD");
        createBadgeIfNotPresent("Popular", badgeType, payload.userId);
    }

    if (action === "COMMENT_ADDED") {
        const noOfComments = await Comment.count({ where: { user_id: payload.commentedUserId } });
        if (noOfComments >= 3) {
            createBadgeIfNotPresent("Pundit", "SILVER", payload.commentedUserId);
        }
    }
}

const createBadgeIfNotPresent = async (name, type, userId) => {
    try {
        await new Badge({ name: name, type: type, user_id: userId }).save();
        let badgeTypeCount = type.toLowerCase() + "_badges_count";
        await User.increment({ [badgeTypeCount]: 1 }, { where: { id: userId } });
    } catch (error) {
        console.log(`User already has ${name} badge in ${type} category. So, not awarding this badge`);
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