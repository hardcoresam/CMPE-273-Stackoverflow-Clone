const mongoose = require('mongoose');

const reputationHistorySchema = new mongoose.Schema({
    owner_id: {
        type: Number,
        required: true
    },
    post_id: {
        type: Number,
        required: true
    },
    post_parent_id: {
        type: Number
    },
    post_title: {
        type: String,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    reputation: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['UPVOTE', 'DOWNVOTE', 'ACCEPT']
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

module.exports = mongoose.model("ReputationHistory", reputationHistorySchema);