const { User, Post, Tag, PostTag } = require("../models/mysql");
const { sequelize, Sequelize } = require("../models/mysql/index");
const actions = require("../../util/kafkaActions.json");

exports.handle_request = (payload, callback) => {
  const { action } = payload;
  switch (action) {
    case actions.GET_QUESTIONS_FOR_TAG:
      getQuestionsForTag(payload, callback);
      break;
    case actions.NEW_TAG:
      createNewTag(payload, callback);
      break;
    case actions.FILTER_TAG_NAME:
      filterByTagName(payload, callback);
      break;
    case actions.GET_ALL_TAGS:
      getAllTags(payload, callback);
      break;
  }
};

exports.getUserActivityTags = async (userId, shouldLimit) => {
  let sqlQuery =
    "select pt.tag_id, t.name, sum(p.score) as score, count(p.id) as no_of_posts from post p " +
    "inner join post_tag pt on p.id = pt.post_id inner join tag t on t.id = pt.tag_id " +
    "where p.owner_id = :userId and p.type = 'QUESTION' group by pt.tag_id order by score desc";

  if (shouldLimit) {
    sqlQuery = sqlQuery + " limit 6";
  }

  const sqlResults = await sequelize.query(sqlQuery, {
    replacements: { userId: userId },
    type: Sequelize.QueryTypes.SELECT,
  });

  let userTags = [];
  for (const result of sqlResults) {
    var userTag = {
      id: result.tag_id,
      name: result.name,
      score: result.score,
      totalPosts: result.no_of_posts,
    };
    userTags.push(userTag);
  }
  return userTags;
};

const getQuestionsForTag = async (payload, callback) => {
  const tagName = payload.params.tagName;
  const tagFromDb = await Tag.findOne({ where: { name: tagName } });
  if (tagFromDb === null) {
    return callback({ error: "Invalid tag name specified" }, null);
  }
  let offset = 0;
  if (payload.query.offset) {
    offset = payload.query.offset;
  }

  const filterBy = payload.query.filterBy;
  const show_user_posts = payload.query.show_user_posts === 'true';
  const userid = payload.query.userid;
  let whereCondition = {};
  if (show_user_posts && userid) {
    whereCondition.id = userid;
  }
  let whereStatement = {};
  if (filterBy === "unanswered") {
    whereStatement.answers_count = 0;
  }
  let orderBy;
  if (filterBy === "score" || filterBy === "unanswered") {
    orderBy = "score";
  } else if (filterBy === "hot") {
    orderBy = "views_count";
  } else if (filterBy === "interesting") {
    orderBy = "modified_date";
  }

  const tagQuestions = await Tag.findOne({
    where: { name: tagName },
    include: {
      model: Post,
      where: whereStatement,
      include: [
        {
          model: User,
          where: whereCondition,
          attributes: ["id", "username", "photo", "reputation"],
          required: true
        }
      ],
      required: true
    },
    order: [[Post, orderBy, "DESC"]]
  });
  return callback(null, tagQuestions !== null ? tagQuestions : []);
};

const createNewTag = async (payload, callback) => {
  const { name, description } = payload;
  const existingtag = await Tag.findOne({ where: { name } });
  const adminUser = await User.findOne({ where: { id: payload.USER_ID } });
  if (adminUser && adminUser.is_admin == 1) {
    if (existingtag) {
      return callback({ errors: { name: { msg: `Tag ${name} already exists` } } }, null);
    }
    const newtag = await new Tag({
      name: name.toLowerCase(),
      description,
      admin_id: payload.USER_ID,
    }).save();
    return callback(null, newtag);
  }
  return callback({ errors: { name: { msg: "You are not authorized to create new tag" } } }, null);
};

const filterByTagName = async (payload, callback) => {
  const name = payload.params.tagname;
  const tags = await Tag.findAll();
  if (tags) {
    const filteredtags = tags.filter((tag) => tag.name.includes(name) == true);
    return callback(null, filteredtags);
  }
  return callback(null, []);
};

const getAllTags = async (payload, callback) => {
  const allTagsSql = "select pt.tag_id, t.name, t.description, count(p.id) as no_of_questions, " +
    "sum(case when date(p.created_date) = :todayDate then 1 else 0 end) as no_of_questions_asked_today, " +
    "sum(case when date(p.created_date) >= :thisWeekDate then 1 else 0 end) as no_of_questions_asked_this_week " +
    "from post p inner join post_tag pt on p.id = pt.post_id inner join tag t on t.id = pt.tag_id " +
    "where p.type = 'QUESTION' group by pt.tag_id order by no_of_questions desc";
  const today = new Date();
  const lastWeekDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const todayDate = today.toISOString().slice(0, 10);
  const thisWeekDate = lastWeekDate.toISOString().slice(0, 10);
  const allTags = await sequelize.query(allTagsSql, {
    replacements: { todayDate: todayDate, thisWeekDate: thisWeekDate },
    type: Sequelize.QueryTypes.SELECT
  });

  return callback(null, allTags);
};
