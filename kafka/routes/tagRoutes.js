const express = require('express');
const router = express.Router();
const TagController = require('../controllers/TagController');

router.get('/:tagId/questions', TagController.getQuestionsForTag);

module.exports = router