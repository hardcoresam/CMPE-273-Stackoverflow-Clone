const MessageRoom = require("../models/mongodb/MessageRoom")
const Message = require("../models/mongodb/Message")
const uuid = require('uuid').v4
const actions = require('../../util/kafkaActions.json');


exports.handle_request = (payload, callback) => {
    const { action } = payload;
    switch (action) {
        case actions.CREATE_CHAT_ROOM:
            createChatRoom(payload, callback);
            break;
        case actions.SEND_MESSAGE:
            sendMessage(payload, callback);
            break;
        case actions.GET_ALL_MESSAGES:
            getMessages(payload, callback);
            break;
        case actions.GET_CHAT_LIST:
            getChatList(payload, callback)
            break
    }
};

const createChatRoom = async (payload, callback) => {
    const { user1, user2 } = payload;

    const participants = user1 + "," + user2

    const existingchatroom = await MessageRoom.findOne({ participants });
    if (existingchatroom !== null) {
        return callback({ error: "Chat room already exists" }, null);
    }

    const RoomId = uuid()

    const room = new MessageRoom({
        room_id: RoomId,
        participants
    })

    room.save((err, data) => {
        if (err) return callback({ error: "Error while creating new chat room" }, null)
        const message = new Message({
            room_id: RoomId,
            from: user1,
            to: user2,
            message: "Started a new Chat",
            timestamp: Date.now()
        })
        console.log("new msg saved")
        message.save((err, data) => {
            if (err) return callback({ error: "Error while sending a Message!!" }, null)
            console.log("--new message sent---")
            return callback(null, message)
        })
    })

}

const sendMessage = async (payload, callback) => {
    console.log("recieved payload- ", payload)
    const { from, to, content } = payload;

    const participants1 = from + "," + to
    const participants2 = to + "," + from

    const existingchatroom1 = await MessageRoom.findOne({ participants: participants1 });
    const existingchatroom2 = await MessageRoom.findOne({ participants: participants2 })

    if (existingchatroom1 == null && existingchatroom2 == null) {
        return callback({ error: "Chat room does not exist" }, null);
    }

    let RoomId = ""
    if (existingchatroom1) {
        RoomId = existingchatroom1.room_id
    } else {
        RoomId = existingchatroom2.room_id
    }

    const message = new Message({
        room_id: RoomId,
        from: from,
        to: to,
        message: content,
        timestamp: Date.now()
    })
    console.log("new msg saved")
    message.save((err, data) => {
        if (err) return callback({ error: "Error while sending a Message!!" }, null)
        return callback(null, data)
    })
}

const getMessages = async (payload, callback) => {
    console.log("recieved payload- ", payload)
    const { room_id } = payload;

    const chatRoom = await MessageRoom.findOne({ room_id });


    if (chatRoom == null) {
        return callback({ error: "Chat room does not exist" }, null);
    }

    const messages = await Message.find({ room_id })

    return callback(null, messages)

}


const getChatList = async (payload, callback) => {
    const { username } = payload

    const chats = await MessageRoom.find()

    console.log("USERNAME:", username)

    const filteredChats = chats.filter(chat => chat.participants.includes(username))

    console.log("FILTERED CHATS:", filteredChats)

    return callback(null, filteredChats)
}