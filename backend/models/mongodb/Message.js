const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    room_id:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    }
}, {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true },
    timestamps: true
});

module.exports = mongoose.model("Message", MessageSchema);