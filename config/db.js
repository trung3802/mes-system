const sql = require("mssql");
require('dotenv').config();

// Cấu hình DB theo service, dùng env để config
const dbConfigs = {
    auth: {
        user: process.env.DB_AUTH_USER,
        password: process.env.DB_AUTH_PASSWORD,
        server: process.env.DB_AUTH_SERVER,
        database: process.env.DB_AUTH_DATABASE,
        options: {
            encrypt: true,                // mã hóa SSL
            enableArithAbort: true,       // xử lý lỗi toán học
            trustServerCertificate: true  // tin tưởng certificate
        },
    },
    hr: {
        user: process.env.DB_HR_USER,
        password: process.env.DB_HR_PASSWORD,
        server: process.env.DB_HR_SERVER,
        database: process.env.DB_HR_DATABASE,
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true,
        },
    },
    qa: {
        user: process.env.DB_QA_USER,
        password: process.env.DB_QA_PASSWORD,
        server: process.env.DB_QA_SERVER,
        database: process.env.DB_QA_DATABASE,
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true,
        },
    },
    mec: {
        user: process.env.DB_MEC_USER,
        password: process.env.DB_MEC_PASSWORD,
        server: process.env.DB_MEC_SERVER,
        database: process.env.DB_MEC_DATABASE,
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true,
        },
    },
    cut: {
        user: process.env.DB_CUT_USER,
        password: process.env.DB_CUT_PASSWORD,
        server: process.env.DB_CUT_SERVER,
        database: process.env.DB_CUT_DATABASE,
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true,
        },
    },
    ie: {
        user: process.env.DB_IE_USER,
        password: process.env.DB_IE_PASSWORD,
        server: process.env.DB_IE_SERVER,
        database: process.env.DB_IE_DATABASE,
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true,
        },
    },
    it: {
        user: process.env.DB_IT_USER,
        password: process.env.DB_IT_PASSWORD,
        server: process.env.DB_IT_SERVER,
        database: process.env.DB_IT_DATABASE,
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true,
        },
    }
};

// Cache pool để tái sử dụng
const pools = {};

/**
 * Kết nối DB theo service
 * @param {string} service - auth, hr, qa, mec, cut, ie, it
 */
async function connect(service) {
    if (!dbConfigs[service]) throw new Error(`Database config for ${service} not found`);
    if (pools[service]) return pools[service];

    try {
        const pool = await new sql.ConnectionPool(dbConfigs[service]).connect();
        pools[service] = pool;
        console.log(`✅ Connected to ${service} DB`);
        return pool;
    } catch (err) {
        console.error(`❌ Connection error [${service}]:`, err.message);
        pools[service] = null;
        throw err;
    }
}

/**
 * Query đơn giản
 */
async function query(service, sqlQuery, params = {}) {
    const pool = await connect(service);
    const request = pool.request();

    for (const [key, value] of Object.entries(params)) {
        request.input(key, value);
    }

    const result = await request.query(sqlQuery);
    return result.recordsets?.[0] || [];
}

/**
 * Transaction helper
 */
// async function transaction(service, callback) {
//     const pool = await connect(service);          // lấy connection
//     const trx = new sql.Transaction(pool);       // tạo transaction

//     try {
//         await trx.begin();                        // bắt đầu transaction
//         const request = trx.request();            // tạo request để chạy query trong transaction
//         const result = await callback(request);   // chạy logic DB do bạn truyền vào
//         await trx.commit();                       // commit nếu không lỗi
//         return result;
//     } catch (err) {
//         await trx.rollback();                     // rollback nếu có lỗi
//         throw err;
//     }
// }
/**
 * Transaction helper
 */
async function transaction(service, callback) {
    const pool = await connect(service);
    const trx = new sql.Transaction(pool);

    try {
        await trx.begin();

        // custom request wrapper để support params
        const requestWrapper = {
            query: async (sqlQuery, params = {}) => {
                const request = new sql.Request(trx);
                for (const [key, value] of Object.entries(params)) {
                    request.input(key, value);
                }
                return request.query(sqlQuery);
            }
        };

        const result = await callback(requestWrapper);
        await trx.commit();
        return result;
    } catch (err) {
        await trx.rollback();
        throw err;
    }
}



module.exports = { connect, query, transaction };
