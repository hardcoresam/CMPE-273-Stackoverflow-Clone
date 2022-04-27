const express = require('express')
const router = express.Router()
const passport = require('passport');
const checkAuth = passport.authenticate("jwt", { session: false });

const PostController = require('../controllers/PostController')

router.post('/question/askquestion', checkAuth, PostController.createQuestion)
router.get('/', checkAuth, PostController.getQuestions)
router.get('/getquestion/:questionId', checkAuth, PostController.getQuestion)
router.put('/bookmark/:questionId', checkAuth, PostController.bookmarkQuestion)
router.put('/unbookmark/:questionId', checkAuth, PostController.unbookmarkQuestion)
router.put('/upvote/:questionId', checkAuth, PostController.upvoteQuestion)
router.put('/downvote/:questionId', checkAuth, PostController.downvoteQuestion)

module.exports = router