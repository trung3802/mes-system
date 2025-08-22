const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Render các trang auth
router.get('/login', AuthController.renderLogin);
router.get('/register', AuthController.renderRegister);

module.exports = router;

