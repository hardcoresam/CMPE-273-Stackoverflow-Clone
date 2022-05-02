const MessageRoom= require("../models/mongodb/MessageRoom")
const uuid=require('uuid').v4
const actions = require('../../util/kafkaActions.json')

exports.handle_request = (payload, callback) => {
    const { action } = payload;
    switch (action) {
        case actions.CREATE_CHAT_ROOM:
            createChatRoom(payload, callback);
            break;
    }
};

const createChatRoom = async (payload, callback) => {
    const {user1,user2} = payload;

    const participants = user1+","+user2

    const existingchatroom = await MessageRoom.findOne({ participants });
    if (existingchatroom !== null) {
        return callback({ errors: { msg : "Chat Room exists"} }, null);
    }
    const room = new MessageRoom({
        room_id:uuid(),
        participants
    })

    room.save((err,data) => {
        if(err) return callback({errors: {msg: "Error crearing new Chat room"}},null)
        return callback(null,data)
    })
  
}

