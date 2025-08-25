// module.exports = {
//     OK: 200,                     // Thành công (request thành công)
//     CREATED: 201,                // Tạo thành công (thường dùng sau POST)
//     BAD_REQUEST: 400,            // Yêu cầu không hợp lệ (thiếu params, sai dữ liệu)
//     UNAUTHORIZED: 401,           // Chưa xác thực (token thiếu hoặc không hợp lệ)
//     FORBIDDEN: 403,              // Không có quyền truy cập
//     NOT_FOUND: 404,               // Không tìm thấy tài nguyên
//     INTERNAL_SERVER_ERROR: 500   // Lỗi server (cần xử lý)
// };
// module.exports = {
//     OK: { code: 200, message: 'Thành công' },
//     CREATED: { code: 201, message: 'Tạo thành công' },
//     BAD_REQUEST: { code: 400, message: 'Yêu cầu không hợp lệ' },
//     UNAUTHORIZED: { code: 401, message: 'Chưa xác thực' },
//     FORBIDDEN: { code: 403, message: 'Không có quyền truy cập' },
//     NOT_FOUND: { code: 404, message: 'Không tìm thấy tài nguyên' },
//     INTERNAL_SERVER_ERROR: { code: 500, message: 'Lỗi server' }
// };
module.exports = {
    OK: { code: 200, message_vi: 'Thành công', message_en: 'Success' },
    CREATED: { code: 201, message_vi: 'Tạo thành công', message_en: 'Created successfully' },
    BAD_REQUEST: { code: 400, message_vi: 'Yêu cầu không hợp lệ', message_en: 'Bad request' },
    UNAUTHORIZED: { code: 401, message_vi: 'Chưa xác thực', message_en: 'Unauthorized' },
    FORBIDDEN: { code: 403, message_vi: 'Không có quyền truy cập', message_en: 'Forbidden' },
    NOT_FOUND: { code: 404, message_vi: 'Không tìm thấy tài nguyên', message_en: 'Not found' },
    INTERNAL_SERVER_ERROR: { code: 500, message_vi: 'Lỗi server', message_en: 'Internal server error' }
};
