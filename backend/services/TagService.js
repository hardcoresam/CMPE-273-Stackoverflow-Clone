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
  const filterBy = payload.query.filterBy;
  const show_user_posts = payload.query.show_user_posts;
  let whereCondition = {};
  if (show_user_posts && payload.USER_ID) {
    whereCondition.id = payload.USER_ID;
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
  return callback(null, tagQuestions);
};

const createNewTag = async (payload, callback) => {
  const { name, description, admin_id } = payload;
  const existingtag = await Tag.findOne({ where: { name } });
  if (existingtag) {
    return callback(
      { errors: { name: { msg: `Tag ${name} already exists` } } },
      null
    );
  }
  const newtag = await new Tag({ name, description, admin_id }).save();
  return callback(null, newtag);
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
  const tags = await Tag.findAll();
  const data = [];
  for (let tag of tags) {
    console.log("tag is", tag.dataValues);

    const topicQuestions = await PostTag.findAll({
      where: { tag_id: tag.dataValues.id },
    });
    let totalQuestionsOnThisTopic = topicQuestions.length;
    console.log("length is ", totalQuestionsOnThisTopic);

    let total_questions_asked_today = 0;
    for (let row of topicQuestions) {
      created_date = JSON.stringify(row.dataValues.created_date);
      console.log("Date got fron db", typeof row.dataValues.created_date);
      const myArray1 = created_date.split("T");
      let only_date_got = myArray1[0];
      console.log("only date", only_date_got);
      var today = new Date();
      console.log(today);
      todays_date = JSON.stringify(today);
      const myArray2 = todays_date.split("T");

      var only_todays_date = myArray2[0];
      console.log("Todays Date", only_todays_date);
      var result = only_todays_date.localeCompare(only_date_got);
      console.log("Result", result);
      if (result === 0) {
        total_questions_asked_today = total_questions_asked_today + 1;
      }
    }
    data.push({
      name: tag.dataValues.name,
      description: tag.dataValues.description,
      total_questions_asked: totalQuestionsOnThisTopic,
      total_questions_asked_today: total_questions_asked_today,
    });
  }

  return callback(null, data);
};
