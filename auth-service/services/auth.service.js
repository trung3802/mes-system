const AuthRepository = require('../repository/auth.repository');
const bcrypt = require('bcryptjs');
const jwt = require('../../common/utils/jwt');

class AuthService {
    constructor() {
        this.repository = new AuthRepository();
    }

    async register(userData) {
        // console.log('Registering user:', userData);
        // Check trùng email hoặc employeeCode 1 lần
        const existing = await this.repository.getUserByLogin(userData.email) ||
            await this.repository.getUserByLogin(userData.employeeCode);
        if (existing) {
            if (existing.Email === userData.email) throw new Error('Email đã được sử dụng / Email already exists');
            if (existing.EmployeeCode === userData.employeeCode) throw new Error('Mã nhân viên đã được sử dụng / Employee code already exists');
        }

        // Hash password
        const passwordHash = await bcrypt.hash(userData.password, 10);
        const newUserData = { ...userData, passwordHash };

        const userId = await this.repository.createUser(newUserData);
        return { userId, message: 'Đăng ký thành công / Registration successful' };
    }

    async login(identifier, password) {
        const user = await this.repository.getUserByLogin(identifier);

        // Kiểm tra user tồn tại
        if (!user) {
            throw new Error('Tên đăng nhập hoặc mật khẩu không đúng / Incorrect username or password');
        }

        // Kiểm tra password (plaintext)
        if (user.PasswordHash !== password) {
            throw new Error('Tên đăng nhập hoặc mật khẩu không đúng / Incorrect username or password');
        }

        // Kiểm tra trạng thái active
        if (!user.IsActive) {
            throw new Error('Tài khoản đã bị khóa / Account is inactive');
        }

        const token = jwt.signToken({ userId: user.ID, employeeCode: user.EmployeeCode });

        const safeUser = {
            ID: user.ID,
            EmployeeCode: user.EmployeeCode,
            Username: user.Username,
            FullName: user.FullName,
            Email: user.Email,
            Phone: user.Phone,
            IsActive: user.IsActive
        };

        return { user: safeUser, token };
    }

    async getUserById(userId) {
        return this.repository.getUserById(userId);
    }
    async getAllUsers() {
        return await this.repository.getAllUsers();
    }

}

module.exports = new AuthService();
