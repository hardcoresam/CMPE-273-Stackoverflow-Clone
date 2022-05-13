const { User, Badge, Post, Bookmark } = require("../models/mysql");
const { sequelize, Sequelize } = require("../models/mysql/index");
const TagService = require("./TagService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const actions = require("../../util/kafkaActions.json");
const { cacheGet, cacheAdd } = require("./../config/RedisClient");
const ReputationHistory = require("../models/mongodb/ReputationHistory");

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
    case actions.GET_USER_REPUTATION_HISTORY:
      getUserReputationHistory(payload, callback);
      break;
    case actions.GET_USER:
      getUser(payload, callback);
      break;
    case actions.GET_PROFILE:
      getProfile(payload, callback);
      break;
    case actions.GET_ALL_USERS:
      getAllUsers(payload, callback);
      break;
    case actions.EDIT_PROFILE:
      editProfile(payload, callback);
      break;
    case actions.FILTER_BY_USERNAME:
      filterByUsername(payload, callback)
  }
};

//TODO - Check wherever we are implementing pagination and keep that code and remove from elsewhere

const createUser = async (payload, callback) => {
  const { displayName, email, password } = payload;
  const previousMember = await User.findOne({
    where: { email: email.toLowerCase() },
  });
  if (previousMember !== null) {
    return callback({ error: `Email ${email} is already registered. Please login or use a different email` }, null);
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newMember = await new User({
    email: email.toLowerCase(),
    password: hashedPassword,
    username: displayName,
  }).save();

  const jwtPayload = { user: { id: newMember.id } };
  jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, (err, token) => {
    if (err) {
      console.error(err);
      return callback({ error: "Unexpected error. Please try again!" }, null);
    }
    return callback(null, { newMember: newMember, token: token });
  });
};

const login = async (payload, callback) => {
  const { email, password } = payload;
  const member = await User.findOne({ where: { email: email.toLowerCase() } });
  if (member === null) {
    return callback({ error: `Email ${email} is not registered with us` }, null);
  }
  if (!bcrypt.compareSync(password, member.password)) {
    return callback({ error: "Incorrect password. Please try again!" }, null);
  }

  const jwtPayload = { user: { id: member.id } };
  jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, async (err, token) => {
    if (err) {
      console.error(err);
      return callback({ error: "Unexpected error. Please try again!" }, null);
    }
    member.set({ last_login_time: sequelize.fn('NOW') });
    await member.save();
    return callback(null, { member: member, token: token });
  });
};

const getUserProfile = async (payload, callback) => {
  const userId = payload.params.userId;
  const user = await User.findOne({
    where: { id: userId },
    include: {
      model: Badge,
    },
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
  }

  const answersCount = await Post.count({
    where: {
      type: "ANSWER",
      owner_id: userId,
    },
  });
  const questionsCount = await Post.count({
    where: {
      type: "QUESTION",
      owner_id: userId,
    },
  });
  const userReach = await Post.sum("views_count", {
    where: {
      type: "QUESTION",
      owner_id: userId,
    },
  });

  let userTags = await TagService.getUserActivityTags(userId, true);

  user.setDataValue("topTags", userTags);
  user.setDataValue("answersCount", answersCount);
  user.setDataValue("questionsCount", questionsCount);
  user.setDataValue("userReach", userReach === null ? 0 : userReach);
  user.setDataValue("bronzeBadges", bronzeBadges.slice(0, 3));
  user.setDataValue("silverBadges", silverBadges.slice(0, 3));
  user.setDataValue("goldBadges", goldBadges.slice(0, 3));
  return callback(null, user);
};

const getUserProfileTopPosts = async (payload, callback) => {
  const userId = payload.params.userId;
  const { postType, sortValue } = payload.query;

  let whereStatement = {
    owner_id: userId,
  };
  if (postType !== "ALL") {
    whereStatement["type"] = postType;
  }

  let orderBy = [];
  if (sortValue === "NEWEST") {
    orderBy.push(["created_date", "DESC"]);
  } else {
    orderBy.push(["score", "DESC"]);
  }

  const topPosts = await Post.findAll({
    where: whereStatement,
    include: {
      model: Post,
      attributes: ["id", "tags", "title", "type", "score", "answers_count", "accepted_answer_id", "owner_id"],
      as: "question",
    },
    order: orderBy,
    limit: 10,
  });
  return callback(null, topPosts);
};

const getUserAnswers = async (payload, callback) => {
  const userId = payload.params.userId;

  let offset = 0;
  if (payload.query.offset) {
    offset = payload.query.offset
  }

  const userAnswers = await Post.findAll({
    where: {
      owner_id: userId,
      type: "ANSWER",
    },
    include: {
      model: Post,
      attributes: ["id", "tags", "title", "type", "score", "answers_count", "accepted_answer_id", "owner_id"],
      as: "question",
    },
    order: [["score", "DESC"]],
    offset: parseInt(offset),
    limit: 10
  });
  const answersCount = await Post.count({
    where: {
      owner_id: userId,
      type: "ANSWER",
    }
  });
  return callback(null, { userAnswers, answersCount });
};

const getUserQuestions = async (payload, callback) => {
  const userId = payload.params.userId;

  let whereStatement = {
    owner_id: userId,
    type: "QUESTION"
  };
  if (payload.query.filterBy) {
    whereStatement.status = payload.query.filterBy;
  }

  let offset = 0;
  if (payload.query.offset) {
    offset = payload.query.offset
  }

  const userQuestions = await Post.findAll({
    where: whereStatement,
    order: [["score", "DESC"]],
    offset: parseInt(offset),
    limit: 10
  });

  const questionsCount = await Post.count({ where: whereStatement });
  return callback(null, { userQuestions, questionsCount });
};

const getUserBookmarks = async (payload, callback) => {
  const userId = payload.params.userId;
  const userBookmarks = await Bookmark.findAll({
    where: {
      user_id: userId,
    },
    include: {
      model: Post,
      required: true,
    },
    order: [["created_on", "DESC"]]
  });
  return callback(null, userBookmarks);
};

const getUserBadges = async (payload, callback) => {
  const userId = payload.params.userId;

  const userBadges = await Badge.findAll({
    where: {
      user_id: userId,
    },
    order: [["awarded_on", "DESC"]],
  });
  return callback(null, userBadges);
};

const getUserTags = async (payload, callback) => {
  const userId = payload.params.userId;
  let userTags = await TagService.getUserActivityTags(userId, false);
  return callback(null, userTags);
};

const getUserReputationHistory = async (payload, callback) => {
  const userId = payload.params.userId;
  let reputationHistoryList = await ReputationHistory.find({ owner_id: userId }).sort('-created_on');
  let response = [];

  for (let reputationHistory of reputationHistoryList) {
    let existingValue = response.find(value => value.date === reputationHistory.created_on.slice(0, 10));
    if (existingValue) {
      let existingHistoryObject = existingValue.history.find(h => h.postId === reputationHistory.post_id);
      if (existingHistoryObject) {
        existingHistoryObject.postHistoryGrouping.push({
          type: reputationHistory.type,
          score: reputationHistory.reputation,
          time: reputationHistory.created_on.slice(12, 17)
        });
        existingHistoryObject.postHistoryGroupingScore = existingHistoryObject.postHistoryGroupingScore +
          reputationHistory.reputation;
      } else {
        existingValue.history.push({
          postId: reputationHistory.post_id,
          postParentId: reputationHistory.post_parent_id,
          postTitle: reputationHistory.post_title,
          postHistoryGrouping: [
            {
              type: reputationHistory.type,
              score: reputationHistory.reputation,
              time: reputationHistory.created_on.slice(12, 17)
            }
          ],
          postHistoryGroupingScore: reputationHistory.reputation
        });
      }
      existingValue.totalReputation = existingValue.totalReputation + reputationHistory.reputation;
    } else {
      response.push({
        date: reputationHistory.created_on.slice(0, 10),
        totalReputation: reputationHistory.reputation,
        history: [
          {
            postId: reputationHistory.post_id,
            postParentId: reputationHistory.post_parent_id,
            postTitle: reputationHistory.post_title,
            postHistoryGrouping: [
              {
                type: reputationHistory.type,
                score: reputationHistory.reputation,
                time: reputationHistory.created_on.slice(12, 17)
              }
            ],
            postHistoryGroupingScore: reputationHistory.reputation
          }
        ]
      });
    }
  }
  const userReputation = await User.findOne({ where: { id: userId }, attributes: ["id", "reputation"] });
  return callback(null, { response, totalReputation: userReputation.reputation });
};

const getUser = async (payload, callback) => {
  const userName = payload.params.username;
  cacheGet(userName, async (err, res) => {
    if (err) {
      const user = await User.findOne({ where: { username: userName } });
      if (user) {
        cacheAdd(userName, user.dataValues);
        return callback(null, user.dataValues);
      }
      return callback(null, {});
    }
    return callback(null, res);
  });
};

const getProfile = async (payload, callback) => {
  const userId = payload.USER_ID;
  const user = await User.findOne({
    where: { id: userId },
  });
  data = {
    photo: user.photo,
    username: user.username,
    location: user.location,
    about: user.about,
  };
  return callback(null, data);
};

const getAllUsers = async (payload, callback) => {
  const users = await User.findAll({
    order: [["reputation", "DESC"]],
  });
  return callback(null, users);
};

const editProfile = async (payload, callback) => {
  const photo = payload.photo;
  const about = payload.about;
  const location = payload.location;
  const username = payload.username;
  let sqlQuery =
    "update user set photo = :photo, about =:about, location =:location, username=:username where id = :user_id";
  await sequelize.query(sqlQuery, {
    replacements: {
      photo: photo,
      about: about,
      location: location,
      username: username,
      user_id: payload.params.userId,
    },
    type: Sequelize.QueryTypes.UPDATE,
  });

  return callback(null, "User profile edited successfully");
};


const filterByUsername = async (payload, callback) => {
  const name = payload.params.username;
  const users = await User.findAll();
  if (users) {
    const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(name.toLowerCase()) == true);
    return callback(null, filteredUsers);
  }
  return callback(null, []);
}