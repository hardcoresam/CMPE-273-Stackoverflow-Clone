const express = require('express');
const router = express.Router();
const MessageController= require("../controllers/MessageController")


router.post('/createChatRoom', MessageController.createChatRoom)




module.exports = router