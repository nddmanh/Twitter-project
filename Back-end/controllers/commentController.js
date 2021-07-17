const Comment = require('./../models/Comment');

// Get all Comment
exports.getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ }).populate('author', 'name').select('contentCmt post createdAt');
        res.status(200).json({
            status: 'success',
            result: comments.length,
            data: {comments}
        })
    } catch (error) {
        res.json(error);
    }
};

// Create one comment
exports.createOneComment = async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {postId} = req.params;
        const comment = await Comment.create({...req.body, author: userId, post: postId});
        res.status(200).json({
            status: 'success',
            data: { comment }
        })
    } catch (error) {
        next(error);
    }
};

// Update one comment
exports.updateOneComment = async (req, res, next) => {
    try {
        const {commentId} = req.params;
        const comment = await Comment.findByIdAndUpdate(commentId, {...req.body}, {new: true, runValidator: true});
        res.status(200).json({
            status: 'success',
            data: {comment}
        })
    } catch (error) {
        next(error);
    }
};

// Delete one comment
exports.deleteOneComment = async (req, res, next) => {
    try {
        const {commentId} = req.params;
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({
            status: 'success',
            message: 'Comment has been deleted.'
        })
    } catch (error) {
        next(error);
    }
};