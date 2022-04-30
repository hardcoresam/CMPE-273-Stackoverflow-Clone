const kafka = require("./../kafka/kafka");
const actions = require("../../util/kafkaActions.json");
const kafkaTopics = require("../../util/kafkaTopics.json");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }
  kafka.sendKafkaRequest(
    kafkaTopics.USERS_TOPIC,
    { ...req.body, action: actions.REGISTER_USER },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      res.cookie("access-token", data.token, {
        maxAge: 9000000,
        httpOnly: false,
      });
      res.cookie("ID", data.id, {
        maxAge: 9000000,
        httpOnly: false,
      });
      return res.json(data);
    }
  );
};

exports.login = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.USERS_TOPIC,
    { ...req.body, action: actions.LOGIN },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      res.cookie("access-token", data.token, {
        maxAge: 9000000,
        httpOnly: false,
      });
      res.cookie("ID", data.id, {
        maxAge: 9000000,
        httpOnly: false,
      });
      return res.json(data);
    }
  );
};

exports.getUserProfile = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.USERS_TOPIC,
    { ...req.body, params: req.params, action: actions.GET_USER_PROFILE },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};

exports.getUserProfileTopPosts = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.USERS_TOPIC,
    {
      ...req.body,
      params: req.params,
      query: req.query,
      action: actions.GET_USER_PROFILE_TOP_POSTS,
    },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};

exports.getUserAnswers = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.USERS_TOPIC,
    { ...req.body, params: req.params, action: actions.GET_USER_ANSWERS },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};

exports.getUserQuestions = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.USERS_TOPIC,
    { ...req.body, params: req.params, action: actions.GET_USER_QUESTIONS },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};

exports.getUserBookmarks = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.USERS_TOPIC,
    { ...req.body, params: req.params, action: actions.GET_USER_BOOKMARKS },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};

exports.getUserBadges = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.USERS_TOPIC,
    { ...req.body, params: req.params, action: actions.GET_USER_BADGES },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};

exports.getUserTags = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.USERS_TOPIC,
    { ...req.body, params: req.params, action: actions.GET_USER_TAGS },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};

exports.getUser = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.USERS_TOPIC,
    { ...req.body, params: req.params, action: actions.GET_USER },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};

exports.getProfile = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.USERS_TOPIC,
    { ...req.body, action: actions.GET_PROFILE },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};

exports.getAllUsers = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.USERS_TOPIC,
    { ...req.body, action: actions.GET_ALL_USERS },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};
