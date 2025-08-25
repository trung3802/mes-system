const AuthService = require('../services/auth.service');
const HTTP = require('../../common/constants/httpStatus');

class AuthController {
    async register(req, res) {
        try {
           // console.log('Registering user:', req.body);
            const userData = req.body;
            const { userId } = await AuthService.register(userData);

            return res.status(HTTP.CREATED.code).json({
                code: HTTP.CREATED.code,
                message_vi: 'Đăng ký thành công',
                message_en: 'Registration successful',
                data: { userId }
            });
        } catch (error) {
            return res.status(HTTP.BAD_REQUEST.code).json({
                code: HTTP.BAD_REQUEST.code,
                message_vi: error.message,
                message_en: error.message
            });
        }
    }

    async login(req, res) {
        try {
            const { identifier, password } = req.body;
            const result = await AuthService.login(identifier, password);

            return res.status(HTTP.OK.code).json({
                code: HTTP.OK.code,
                message_vi: 'Đăng nhập thành công',
                message_en: 'Login successful',
                data: result
            });
        } catch (error) {
            return res.status(HTTP.UNAUTHORIZED.code).json({
                code: HTTP.UNAUTHORIZED.code,
                message_vi: error.message,
                message_en: error.message
            });
        }
    }

    // GET /user/profile
    async getProfile(req, res) {
        try {
            const userId = req.user.userId; // auth middleware đã gắn vào req.user
            const user = await AuthService.getUserById(userId);
            console.log('getProfile user:', user);

            if (!user) {
                return res.status(HTTP.NOT_FOUND.code).json({
                    code: HTTP.NOT_FOUND.code,
                    message_vi: HTTP.NOT_FOUND.message_vi,
                    message_en: HTTP.NOT_FOUND.message_en
                });
            }

            return res.status(HTTP.OK.code).json({
                code: HTTP.OK.code,
                message_vi: 'Lấy thông tin user thành công',
                message_en: 'Get user info successfully',
                data: user
            });
        } catch (error) {
            return res.status(HTTP.INTERNAL_SERVER_ERROR.code).json({
                code: HTTP.INTERNAL_SERVER_ERROR.code,
                message_vi: HTTP.INTERNAL_SERVER_ERROR.message_vi,
                message_en: HTTP.INTERNAL_SERVER_ERROR.message_en
            });
        }
    }

    // GET /user/all
    async getAllUsers(req, res) {
        try {
            const users = await AuthService.getAllUsers();

            return res.status(200).json({
                code: 200,
                message_vi: "Lấy danh sách user thành công",
                message_en: "Get all users successfully",
                data: users
            });
        } catch (error) {
            console.error("Error getAllUsers:", error);
            return res.status(500).json({
                code: 500,
                message_vi: "Lỗi server",
                message_en: "Internal server error"
            });
        }
    }

}

module.exports = new AuthController();
