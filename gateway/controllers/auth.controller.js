// gateway/controllers/auth.controller.js
exports.renderLogin = (req, res) => {
    res.render('login', { title: 'Đăng nhập' });
};

exports.renderRegister = (req, res) => {
    res.render('register', { title: 'Đăng ký' });
};
// // gateway/controllers/home.controller.js
// exports.renderHome = (req, res) => {
//     res.render('home', { title: 'Trang chủ' });
// };

