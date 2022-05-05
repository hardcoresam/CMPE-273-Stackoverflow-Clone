const express = require('express')
const router = express.Router()
const passport = require('passport');
const checkAuth = passport.authenticate("jwt", { session: false });

const AdminController = require('./../controllers/AdminController')

router.post('/new-tag', checkAuth, AdminController.newTag)
router.post('/pending-approval', checkAuth, AdminController.getPendingApprovalQuestions)
router.post('/approve', checkAuth, AdminController.approveQuestion)
router.get('/stats', checkAuth, AdminController.getAdminStats)

module.exports = router