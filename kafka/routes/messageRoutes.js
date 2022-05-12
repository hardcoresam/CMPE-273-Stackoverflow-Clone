const express = require('express');
const router = express.Router();
const MessageController= require("../controllers/MessageController")


router.post('/createChatRoom', MessageController.createChatRoom)
router.post('/sendMessage',MessageController.sendMessage)
router.post('/getAllMessages',MessageController.getMessages)
router.post('/getChatList',MessageController.getChatList)


module.exports = router