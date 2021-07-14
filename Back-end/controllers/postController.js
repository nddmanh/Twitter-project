const Post = require('./../models/Post');

// Get all Posts
exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({}).populate('author', 'name').select('content createdAt');
        res.status(200).json({
            status: 'success',
            result: posts.length,
            data: {posts}
        })
    } catch (error) {
        res.json(error);
    }
};

// Create one post
exports.createOnePost = async (req, res, next) => {
    try {
        const {userId} = req.user;
        const post = await Post.create({...req.body, author: userId});
        res.status(200).json({
            status: 'success',
            data: { post }
        })
    } catch (error) {
        next(error);
    }
};

// Update one post
exports.updateOnePost = async (req, res, next) => {
    try {
        const {postId} = req.params;
        const post = await Post.findByIdAndUpdate(postId, {...req.body}, {new: true, runValidator: true});
        res.status(200).json({
            status: 'success',
            data: {post}
        })
    } catch (error) {
        next(error);
    }
};

// Delete one post
exports.deleteOnePost = async (req, res, next) => {
    try {
        const {postId} = req.params;
        await Post.findByIdAndDelete(postId);
        res.status(200).json({
            status: 'success',
            message: 'Post has been deleted.'
        })
    } catch (error) {
        next(error);
    }
};

// Count the like
exports.getCountLike = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);
        const userLike = post.userIdLike;
        res.status(200).json({
            status: 'success',
            data: { userLike }
        })
    } catch (error) {
        next(error);
    }
};

// Like One Post
exports.likeOnePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { userId } = req.user;

        const post = await Post.findByIdAndUpdate(postId,
            { "$addToSet": { "userIdLike": userId } },
            { new: true, runValidator: true },
            function (err, managerparent) {
                if (err) throw err;
            }
        );

        res.status(200).json({
            status: 'success',
            data: {post}
        })
    } catch (error) {
        next(error);
    }
};

// Unlike One Post
exports.unlikeOnePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { userId } = req.user;

        const post = await Post.findByIdAndUpdate(postId,
            { "$pull": { "userIdLike": userId } },
            { new: true, runValidator: true },
            function (err, managerparent) {
                if (err) throw err;
            }
        );

        res.status(200).json({
            status: 'success',
            data: {post}
        })
    } catch (error) {
        next(error);
    }
};

