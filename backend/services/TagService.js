const { User, Post, Tag } = require("../models/mysql");
const { sequelize, Sequelize } = require("../models/mysql/index");
const actions = require('../../util/kafkaActions.json')

exports.handle_request = (payload, callback) => {
    const { action } = payload;
    switch (action) {
        case actions.GET_QUESTIONS_FOR_TAG:
            getQuestionsForTag(payload, callback);
            break;
        case actions.NEW_TAG:
            createNewTag(payload, callback)
            break
    }
};

exports.getUserActivityTags = async (userId, shouldLimit) => {
    let sqlQuery = "select pt.tag_id, t.name, sum(p.score) as score, count(p.id) as no_of_posts from post p " +
        "inner join post_tag pt on p.id = pt.post_id inner join tag t on t.id = pt.tag_id " +
        "where p.owner_id = :userId and p.type = 'QUESTION' group by pt.tag_id order by score desc";

    if (shouldLimit) {
        sqlQuery = sqlQuery + " limit 6";
    }

    const sqlResults = await sequelize.query(sqlQuery, {
        replacements: { userId: userId },
        type: Sequelize.QueryTypes.SELECT
    });

    let userTags = [];
    for (const result of sqlResults) {
        var userTag = {
            id: result.tag_id,
            name: result.name,
            score: result.score,
            totalPosts: result.no_of_posts
        }
        userTags.push(userTag);
    }
    return userTags;
}

const getQuestionsForTag = async (payload, callback) => {
    const tagId = payload.params.tagId;
    const filterBy = payload.query.filterBy;
    let whereStatement = {};
    if (filterBy === 'unanswered') {
        whereStatement.answers_count = 0;
    }
    let orderBy;
    if (filterBy === 'score' || filterBy === 'unanswered') {
        orderBy = 'score';
    } else if (filterBy === 'hot') {
        orderBy = 'views_count';
    } else if (filterBy === 'interesting') {
        orderBy = 'modified_date';
    }

    const tagQuestions = await Tag.findOne({
        where: { id: tagId }, include: {
            model: Post,
            where: whereStatement,
            include: [{
                model: User,
                attributes: ['id', 'username', 'photo', 'reputation']
            }],
            required: true
        },
        order: [[Post, orderBy, 'DESC']]
    });
    return callback(null, tagQuestions);
}

const createNewTag = async (payload, callback) => {
    console.log("creatingnew tag ----")
    const { name, description, admin_id } = payload
    const existingtag = await Tag.findOne({ where: { name } })
    if (existingtag) {
        return callback({ errors: { name: { msg: `Tag ${name} already exists` } } }, null);
    }
    const newtag = await new Tag({ name, description, admin_id }).save()
    return callback(null, newtag)
}