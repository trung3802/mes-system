// const jwt = require('../utils/jwt');

// exports.verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ message: 'Thiếu token' });

//     try {
//         const token = authHeader.split(' ')[1];
//         req.user = jwt.verifyToken(token);
//         next();
//     } catch (err) {
//         res.status(403).json({ message: 'Token không hợp lệ' });
//     }
// };
const jwt = require('../utils/jwt');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Kiểm tra thiếu Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Không có token hoặc định dạng không hợp lệ (Bearer <token>)' });
    }

    const token = authHeader.split(' ')[1]; // Cắt lấy phần token sau "Bearer"

    try {
        // Giải mã token, lưu thông tin user vào req.user
        const decoded = jwt.verifyToken(token);
        req.user = decoded;
        next(); // Cho phép đi tiếp
    } catch (err) {
        console.error('Lỗi xác thực token:', err.message);
        return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};
