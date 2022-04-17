const express = require('express')
const router = express.Router()

const QuestionController = require('../controllers/QuestionController')

router.post('/askquestion',QuestionController.createQuestion)
router.post('/',QuestionController.getQuestions)


module.exports = router