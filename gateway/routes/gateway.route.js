

// module.exports = router;
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();
const services = require("../services/service.config");

// const services = {
//     auth: {
//         route: '/api/auth',
//         url: 'http://localhost:8080/api/auth'
//     }
// };

// router.use(
//     services.auth.route,
//     createProxyMiddleware({
//         target: services.auth.url,
//         changeOrigin: true,
//         logLevel: 'debug',
//         // pathRewrite: (path, req) => path.replace(/^\/api\/auth/, ""), 
//         // prependPath: false, // <-- quan trọng, giữ nguyên path
//         pathRewrite: { "^/api/auth": "/api/auth" }, // giữ nguyên prefix
//         onProxyReq: (proxyReq, req, res) => {
//             console.log('[ProxyReq] Forwarding:', req.method, req.originalUrl);
//         },
//         onProxyRes: (proxyRes, req, res) => {
//             console.log('[ProxyRes] Status:', proxyRes.statusCode, 'for', req.originalUrl);
//         },
//         onError: (err, req, res) => {
//             console.error('[ProxyError]', err.message);
//             res.status(500).send('Proxy error');
//         }
//     })
// );
// Loop qua từng service trong config
Object.values(services).forEach(service => {
    router.use(
        service.route,
        createProxyMiddleware({
            target: service.url,
            changeOrigin: true,
            logLevel: "debug",
            pathRewrite: (path, req) => {
                // giữ nguyên prefix (vd: /api/auth/login -> /api/auth/login)
                return path;
            },
            onProxyReq: (proxyReq, req, res) => {
                console.log(`[ProxyReq] ${req.method} ${req.originalUrl} -> ${service.url}`);
            },
            onProxyRes: (proxyRes, req, res) => {
                console.log(`[ProxyRes] ${proxyRes.statusCode} <- ${service.url}`);
            },
            onError: (err, req, res) => {
                console.error("[ProxyError]", err.message);
                res.status(500).send("Proxy error");
            }
        })
    );
});


// Import các router con
const authRoutes = require("./auth.route");

// Mount router con
router.use("/auth", authRoutes);

// Home page
router.get("/", (req, res) => {
    res.render("home");
});

// // Trang Home
// router.get("/", (req, res) => {
//     res.render("home", { title: "Trang chủ" });
// });
module.exports = router;