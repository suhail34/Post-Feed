const express = require('express');
const router = express.Router();
const { signup_post, signin_post, logOut } = require('../controllers/auth.controllers');
const verifyToken = require('../middlewares/authJWT');

router.route('/signup').post(signup_post);
router.route('/login').post(signin_post);
router.route('/logout').get(verifyToken, logOut);

module.exports = router;
