const express = require("express");
const routes = require("./routes/gateway.route");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Cấu hình view engine EJS
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use("/assets", express.static(path.join(__dirname, "../public/assets")));



// 🔹 Log tất cả request vào Gateway
app.use((req, res, next) => {
    console.log(`[Gateway] Incoming request: ${req.method} ${req.originalUrl}`);

    // Bắt sự kiện khi response kết thúc để log status code
    res.on('finish', () => {
        console.log(`[Gateway] Response status: ${res.statusCode} for ${req.method} ${req.originalUrl}`);
    });

    next();
});
// Mount routes
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`🚀 API Gateway running on port ${PORT}`);
});
