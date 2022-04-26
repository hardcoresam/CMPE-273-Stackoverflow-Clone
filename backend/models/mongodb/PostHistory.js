const mongoose = require('mongoose');

const postHistorySchema = new mongoose.Schema({
    post_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    user_display_name: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    type: {
        type: String,
        enum: ['QUESTION_ASKED', 'ANSWER_POSTED', 'QUESTION_EDITED', 'COMMENT_ADDED']
    },
    created_on: {
        type: Date,
        required: true,
        default: Date.now,
        get: (created_on) => created_on.toLocaleString('en-GB', { timeZone: 'UTC' })
    }
}, {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true },
    timestamps: true
});

module.exports = mongoose.model("PostHistory", postHistorySchema);