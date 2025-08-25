const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRATION || '1d'; // fallback nếu env không có

exports.signToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
exports.verifyToken = (token) => jwt.verify(token, SECRET);
