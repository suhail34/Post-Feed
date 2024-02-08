const express = require('express');
const { create_post, list_posts, search_posts } = require('../controllers/post.controllers');
const verifyToken = require('../middlewares/authJWT');
const router = express.Router();

router.route('/list').get(verifyToken, list_posts)
router.route('/create').post(verifyToken, create_post);
router.route('/search').get(verifyToken, search_posts);

module.exports = router;
