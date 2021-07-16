const express = require('express');

const {getAllComments, createOneComment, updateOneComment, deleteOneComment} = require('../controllers/commentController');
const {verifyToken} = require('./../middlewares/verifyToken')

const Router = express.Router();

Router.route('/').get(verifyToken, getAllComments);

Router.route('/:postId').post(verifyToken, createOneComment);

Router.route('/:commentId').put(verifyToken, updateOneComment).delete(verifyToken, deleteOneComment);

module.exports = Router;