const express = require('express');
const router = express.Router();
const MessageController= require("../controllers/MessageController")


router.post('/createChatRoom', MessageController.createChatRoom)
router.post('/sendMessage',MessageController.sendMessage)
router.post('/getAllMessages',MessageController.getMessages)



module.exports = router