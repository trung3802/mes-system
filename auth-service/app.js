const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log tất cả request vào Auth service
app.use((req, res, next) => {
    console.log('[Auth Service] Incoming request:', req.method, req.originalUrl);
    next();
});

// Mount router
const authRouter = require('./routes/auth.route');
app.use('/api/auth', authRouter);

module.exports = app;
