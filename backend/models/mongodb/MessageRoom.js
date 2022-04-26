const mongoose = require('mongoose');

const MessageRoomSchema = new mongoose.Schema({
    room_id:{
        type:String,
        required:true
    },
    participants:{
        type:String,
        required:true,
        unique:true
    }
}, {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true },
    timestamps: true
});

module.exports = mongoose.model("MessageRoom", MessageRoomSchema);