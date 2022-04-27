const express = require('express')
const router = express.Router()
const passport = require('passport');
const checkAuth = passport.authenticate("jwt", { session: false });

const PostController = require('../controllers/PostController')

router.post('/question', checkAuth, PostController.createQuestion)
router.get('/', PostController.getQuestions)
router.get('/:questionId', checkAuth, PostController.getQuestion)
router.post('/bookmark/:questionId', checkAuth, PostController.bookmarkQuestion)
router.post('/unbookmark/:questionId', checkAuth, PostController.unbookmarkQuestion)
router.put('/vote/:postId', checkAuth, PostController.votePost)

router.post('/activities/:postId', checkAuth, PostController.postActivity)

module.exports = router