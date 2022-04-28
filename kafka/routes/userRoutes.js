const express = require('express');
const router = express.Router();
const Validation = require('../validations/Validation');
const UserController = require('../controllers/UserController');

router.post('/register', Validation.registrationValidation(), UserController.createUser)
router.post('/login', UserController.login)
router.get('/:userId/profile', UserController.getUserProfile)
router.get('/:userId/profile/top_posts', UserController.getUserProfileTopPosts)
router.get('/:userId/activity/answers', UserController.getUserAnswers)
router.get('/:userId/activity/questions', UserController.getUserQuestions)
router.get('/:userId/activity/bookmarks', UserController.getUserBookmarks)
router.get('/:userId/activity/badges', UserController.getUserBadges)
router.get('/:userId/activity/tags', UserController.getUserTags)
router.get('/:username',UserController.getUser)



module.exports = router