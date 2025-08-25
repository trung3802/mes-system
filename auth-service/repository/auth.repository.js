const db = require('../../config/db.js');
const SERVICE_NAME = 'auth';

class AuthRepository {

    // Lấy user theo EmployeeCode, Email hoặc Username
    async getUserByLogin(identifier) {
        try {
            const sql = `
            SELECT * FROM Users 
            WHERE EmployeeCode = @identifier 
               OR Email = @identifier
               OR Username = @identifier
        `;
            const result = await db.query(SERVICE_NAME, sql, { identifier });

            return result[0];
        } catch (error) {
            console.error('Error in getUserByLogin:', error);
            return null; // tránh crash nếu query lỗi
        }
    }


    // Lấy user theo ID kèm roles & departments
    async getUserById(userId) {
        try {
            const sqlUser = `SELECT * FROM Users WHERE ID = @userId`;
            const userResult = await db.query(SERVICE_NAME, sqlUser, { userId });

            const user = userResult || null;
            if (!user) return null;

            const sqlRoles = `
            SELECT r.ID AS roleId, r.RoleName, d.ID AS departmentId, d.DepartmentName
            FROM UserRoleDepartments urd
            JOIN Roles r ON urd.RoleID = r.ID
            JOIN Departments d ON urd.DepartmentID = d.ID
            WHERE urd.UserID = @userId
        `;
            const roleDeptResult = await db.query(SERVICE_NAME, sqlRoles, { userId });

            user.roles = roleDeptResult?.map(r => ({
                //roleId: r.roleId,
                roleName: r.RoleName,
                //departmentId: r.departmentId,
                departmentName: r.DepartmentName
            })) || [];

            //console.log(user); // log debug
            return user;

        } catch (error) {
            console.error('Error in getUserById:', error);
            return null;
        }
    }

    // Lấy toàn bộ users
    async getAllUsers() {
        try {
            const sql = `SELECT * FROM Users`;
            const result = await db.query(SERVICE_NAME, sql);
            const users = result;
            console.log('getAllUsers result:', users); // log debug
            return users;
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            return [];
        }
    }



    // Tạo user mới kèm roles & departments
    // Tạo user mới kèm roles & departments
    // async createUser(userData) {
    //     const sqlInsertUser = `
    //         INSERT INTO Users 
    //             (EmployeeCode, FullName, Email, Phone, PasswordHash, IsActive, Shift, Line, Positions)
    //         OUTPUT INSERTED.ID AS userId
    //         VALUES 
    //             (@employeeCode, @fullName, @email, @phone, @passwordHash, @isActive, @shift, @line, @positions)
    //     `;

    //     const params = {
    //         employeeCode: userData.employeeCode,
    //         fullName: userData.fullName,
    //         email: userData.email,
    //         phone: userData.phone || null,
    //         passwordHash: userData.password,
    //         isActive: userData.isActive ?? 1,
    //         shift: userData.shift || null,
    //         line: userData.line || null,
    //         positions: userData.supervisorId || null
    //     };

    //     const userId = await db.transaction(SERVICE_NAME, async (req) => {
    //         // 1. Insert user
    //         const insertUserResult = await req.query(sqlInsertUser, params);
    //         const id = insertUserResult.recordset[0]?.userId;
    //         if (!id) throw new Error('Failed to create user');

    //         // 2. Insert roles & departments nếu có
    //         if (userData.roles?.length || userData.departments?.length) {
    //             for (const roleId of userData.roles || []) {
    //                 for (const deptId of userData.departments || []) {
    //                     await req.query(
    //                         `INSERT INTO UserRoleDepartments (UserID, RoleID, DepartmentID) 
    //                      VALUES (@userId, @roleId, @deptId)`,
    //                         { userId: id, roleId, deptId }
    //                     );
    //                 }
    //             }
    //         }

    //         return id;
    //     });

    //     return userId;
    // }
    // Tạo user mới (chỉ insert Users)
    async createUser(userData) {
        const sqlInsertUser = `
            INSERT INTO Users 
                (EmployeeCode, FullName, Email, Phone, PasswordHash, IsActive, Shift, Line, Positions)
            OUTPUT INSERTED.ID AS userId
            VALUES 
                (@employeeCode, @fullName, @email, @phone, @passwordHash, @isActive, @shift, @line, @positions)
        `;

        const params = {
            employeeCode: userData.employeeCode,
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone || null,
            passwordHash: userData.password,   // ⚠️ nếu bạn muốn hash thì nên hash trước khi truyền vào
            isActive: userData.isActive ?? 1,
            shift: userData.shift || null,
            line: userData.line || null,
            positions: userData.positions || null   // đổi cho đúng meaning thay vì supervisorId
        };

        const userId = await db.transaction(SERVICE_NAME, async (req) => {
            const insertUserResult = await req.query(sqlInsertUser, params);
            console.log('Insert user result:', insertUserResult);
            // const id = insertUserResult.recordset[0]?.userId;
            // if (!id) throw new Error('Failed to create user');
            // return insertUserResult;
        });

        return userId;
    }
}

module.exports = AuthRepository;
// const productionRepo = new AuthRepository();
// productionRepo.getUserById(1);