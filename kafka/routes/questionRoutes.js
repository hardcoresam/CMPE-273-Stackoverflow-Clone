const express = require('express')
const router = express.Router()
const passport = require('passport');
const checkAuth = passport.authenticate("jwt", { session: false });

const QuestionController = require('../controllers/QuestionController')

router.post('/askquestion', checkAuth, QuestionController.createQuestion)
router.get('/', checkAuth, QuestionController.getQuestions)
router.get('/getquestion/:questionId', checkAuth, QuestionController.getQuestion)
router.put('/bookmark/:questionId', checkAuth, QuestionController.bookmarkQuestion)
router.put('/unbookmark/:questionId', checkAuth, QuestionController.unbookmarkQuestion)
router.put('/upvote/:questionId', checkAuth, QuestionController.upvoteQuestion)
router.put('/downvote/:questionId', checkAuth, QuestionController.downvoteQuestion)

module.exports = router