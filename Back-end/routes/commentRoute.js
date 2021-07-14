const express = require('express');

const {getAllComments, createOneComment, updateOneComment, deleteOneComment} = require('../controllers/commentController');
const { getCountLike } = require('../controllers/postController');
const {verifyToken} = require('./../middlewares/verifyToken')

const Router = express.Router();

Router.route('/').get(getAllComments).get(getCountLike).comment(verifyToken, createOneComment);

Router.route('/:commentId').put(verifyToken, updateOneComment).delete(verifyToken, deleteOneComment);

module.exports = Router;