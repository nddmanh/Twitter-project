const express = require('express');

const {getAllPosts, createOnePost, updateOnePost, deleteOnePost, getCountLike, likeOnePost, unlikeOnePost} = require('../controllers/postController');
const {verifyToken} = require('./../middlewares/verifyToken')

const Router = express.Router();

Router.route('/').get(verifyToken, getAllPosts).post(verifyToken, createOnePost);
Router.route('/:postId').put(verifyToken, updateOnePost).delete(verifyToken, deleteOnePost);

Router.route('/count/:postId').get(verifyToken, getCountLike);
Router.route('/like/:postId').get(verifyToken, likeOnePost);
Router.route('/unlike/:postId').get(verifyToken, unlikeOnePost);

module.exports = Router;