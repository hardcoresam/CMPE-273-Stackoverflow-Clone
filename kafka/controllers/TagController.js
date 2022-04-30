const kafka = require("./../kafka/kafka");
const actions = require("../../util/kafkaActions.json");
const kafkaTopics = require("../../util/kafkaTopics.json");

exports.getQuestionsForTag = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.TAGS_TOPIC,
    {
      ...req.body,
      params: req.params,
      query: req.query,
      action: actions.GET_QUESTIONS_FOR_TAG,
    },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};

exports.filterByTagName = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.TAGS_TOPIC,
    {
      ...req.body,
      params: req.params,
      query: req.query,
      action: actions.FILTER_TAG_NAME,
    },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};

exports.getAllTags = async (req, res) => {
  kafka.sendKafkaRequest(
    kafkaTopics.TAGS_TOPIC,
    {
      ...req.body,
      params: req.params,
      query: req.query,
      action: actions.GET_ALL_TAGS,
    },
    (err, data) => {
      if (err) return res.status(400).json({ message: err });
      return res.json(data);
    }
  );
};
