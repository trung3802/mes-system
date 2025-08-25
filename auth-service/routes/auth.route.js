const express = require("express");
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const auth = require('../../common/middlewares/auth.middleware');
// POST /api/auth/register
router.post('/register', AuthController.register);

// POST /api/auth/login
router.post('/login', AuthController.login);

// GET /api/auth/user/profile - cần token
//router.get('/user/profile', auth.verifyToken, AuthController.getProfile);
router.get('/user/profile', auth.verifyToken, AuthController.getProfile);
router.get('/data-user-all',  AuthController.getAllUsers);

module.exports = router;
