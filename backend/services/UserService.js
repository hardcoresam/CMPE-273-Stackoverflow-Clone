const { User, Badge, Post, Bookmark } = require("../models/mysql");
const { sequelize, Sequelize } = require("../models/mysql/index");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const actions = require('../../util/kafkaActions.json')

exports.handle_request = (payload, callback) => {
    const { action } = payload;
    switch (action) {
        case actions.REGISTER_USER:
            createUser(payload, callback);
            break;
        case actions.LOGIN:
            login(payload, callback);
            break;
        case actions.GET_USER_PROFILE:
            getUserProfile(payload, callback);
            break;
        case actions.GET_USER_PROFILE_TOP_POSTS:
            getUserProfileTopPosts(payload, callback);
            break;
        case actions.GET_USER_ANSWERS:
            getUserAnswers(payload, callback);
            break;
        case actions.GET_USER_QUESTIONS:
            getUserQuestions(payload, callback);
            break;
        case actions.GET_USER_BOOKMARKS:
            getUserBookmarks(payload, callback);
            break;
        case actions.GET_USER_BADGES:
            getUserBadges(payload, callback);
            break;
        case actions.GET_USER_TAGS:
            getUserTags(payload, callback);
            break;
    }
};

const createUser = async (payload, callback) => {
    const { displayName, email, password } = payload;
    const previousMember = await User.findOne({ email: email.toLowerCase() });
    if (previousMember !== null) {
        return callback({ errors: { email: { msg: `Email ${email} is already registered. Please login or use a different email` } } }, null);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newMember = await new User({
        email: email.toLowerCase(),
        password: hashedPassword,
        username: displayName
    }).save();

    return callback(null, newMember);
}

//TODO - Sai Krishna - Update login time after each login
const login = async (payload, callback) => {
    const { email, password } = payload;
    const member = await User.findOne({ email: email.toLowerCase() });
    if (member === null) {
        return callback({ errors: { email: { msg: `Email ${email} is not registed with us` } } }, null);
    }
    if (!bcrypt.compareSync(password, member.password)) {
        return callback({ errors: { password: { msg: 'Incorrect password. Please try again!' } } }, null);
    }

    const jwtPayload = { user: { id: member.id } };
    jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, (err, token) => {
        if (err) {
            console.error(err);
            return callback({ message: 'Server error' }, null);
        }
        return callback(null, { member: member, token: token });
    });
}

const getUserProfile = async (payload, callback) => {
    const userId = payload.params.userId;
    const user = await User.findOne({
        where: { id: userId }, include: {
            model: Badge
        }
    });
    if (user === null) {
        return callback({ error: "Invalid user id specified" }, null);
    }

    let bronzeBadges = [];
    let silverBadges = [];
    let goldBadges = [];
    for (const badge of user.Badges) {
        if (badge.type === "BRONZE") {
            bronzeBadges.push(badge);
        } else if (badge.type === "SILVER") {
            silverBadges.push(badge);
        } else {
            goldBadges.push(badge);
        }
        if (bronzeBadges.length >= 3 && silverBadges.length >= 3 && goldBadges.length >= 3) {
            break;
        }
    }

    const answersCount = await Post.count({
        where: {
            type: "ANSWER",
            owner_id: userId
        }
    });
    const questionsCount = await Post.count({
        where: {
            type: "QUESTION",
            owner_id: userId
        }
    });
    const userReach = await Post.sum('views_count', {
        where: {
            type: "QUESTION",
            owner_id: userId
        }
    });

    let userTags = await getUserActivityTags(userId, true);

    user.setDataValue('topTags', userTags);
    user.setDataValue('answersCount', answersCount);
    user.setDataValue('questionsCount', questionsCount);
    user.setDataValue('userReach', userReach);
    user.setDataValue('bronzeBadges', bronzeBadges);
    user.setDataValue('silverBadges', silverBadges);
    user.setDataValue('goldBadges', goldBadges);
    return callback(null, user);
}

const getUserProfileTopPosts = async (payload, callback) => {
    const userId = payload.params.userId;
    const { postType, sortValue } = payload.query;

    let whereStatement = {
        owner_id: userId
    };
    if (postType !== "ALL") {
        whereStatement['type'] = postType;
    }

    let orderBy = [];
    if (sortValue === "NEWEST") {
        orderBy.push(['created_date', 'DESC']);
    } else {
        orderBy.push(['score', 'DESC']);
    }

    const topPosts = await Post.findAll({
        where: whereStatement,
        include: {
            model: Post,
            attributes: ['id', 'tags', 'title', 'type', 'score', 'answers_count', 'accepted_answer_id', 'owner_id'],
            as: 'question'
        },
        order: orderBy,
        limit: 10
    });
    return callback(null, topPosts);
}

const getUserAnswers = async (payload, callback) => {
    const userId = payload.params.userId;

    const userAnswers = await Post.findAll({
        where: {
            owner_id: userId,
            type: "ANSWER"
        }, include: {
            model: Post,
            attributes: ['id', 'tags', 'title', 'type', 'score', 'answers_count', 'accepted_answer_id', 'owner_id'],
            as: "question"
        },
        order: [['score', 'DESC']]
    });
    return callback(null, userAnswers);
}

const getUserQuestions = async (payload, callback) => {
    const userId = payload.params.userId;

    const userQuestions = await Post.findAll({
        where: {
            owner_id: userId,
            type: "QUESTION"
        },
        order: [['score', 'DESC']]
    });
    return callback(null, userQuestions);
}

const getUserBookmarks = async (payload, callback) => {
    const userId = payload.params.userId;

    const userBookmarks = await Bookmark.findAll({
        where: {
            user_id: userId
        },
        include: {
            model: Post,
            required: true
        },
        order: [['created_on', 'DESC']]
    });
    return callback(null, userBookmarks);
}

const getUserBadges = async (payload, callback) => {
    const userId = payload.params.userId;

    const userBadges = await Badge.findAll({
        where: {
            user_id: userId
        },
        order: [['awarded_on', 'DESC']]
    });
    return callback(null, userBadges);
}

const getUserTags = async (payload, callback) => {
    const userId = payload.params.userId;
    let userTags = await getUserActivityTags(userId, false);
    return callback(null, userTags);
}

const getUserActivityTags = async (userId, shouldLimit) => {
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