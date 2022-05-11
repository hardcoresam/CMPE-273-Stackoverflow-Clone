const passport = require("passport")
const express = require("express");
const router = express.Router();
const Validation = require("../validations/Validation");
const UserController = require("../controllers/UserController");
const checkAuth = passport.authenticate("jwt", { session: false });

router.post("/register", Validation.registrationValidation(), UserController.createUser);
router.post("/login", UserController.login);
router.post("/:userId/editProfile", UserController.editProfile);
router.get("/:userId/profile", UserController.getUserProfile);
router.get("/:userId/profile/top_posts", UserController.getUserProfileTopPosts);
router.get("/:userId/activity/answers", UserController.getUserAnswers);
router.get("/:userId/activity/questions", UserController.getUserQuestions);
router.get("/:userId/activity/bookmarks", UserController.getUserBookmarks);
router.get("/:userId/activity/badges", UserController.getUserBadges);
router.get("/:userId/activity/tags", UserController.getUserTags);
router.get("/:userId/activity/reputation", UserController.getReputationHistory);
router.get("/:username", UserController.getUser);
router.get("/profile/getProfile", UserController.getProfile);
router.get("/", UserController.getAllUsers);
router.get("/filter/:username", UserController.filterByUsername)

module.exports = router;
