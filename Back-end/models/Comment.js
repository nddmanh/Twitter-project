const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contentCmt: {type: String, required: [true, 'Comment have must content.'], trim: true }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;