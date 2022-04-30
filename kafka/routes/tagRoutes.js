const express = require("express");
const router = express.Router();
const TagController = require("../controllers/TagController");

router.get("/:tagName/questions", TagController.getQuestionsForTag);
router.get("/:tagname", TagController.filterByTagName);
router.get("/", TagController.getAllTags);

module.exports = router;
