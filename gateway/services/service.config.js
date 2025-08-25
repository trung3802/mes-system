module.exports = {
    auth: {
        route: "/api/auth",          // client gọi
        url: "http://localhost:8080/api/auth" // service chạy
    },
    hr: {
        route: "/api/hr",
        url: "http://localhost:8081"
    },
    production: {
        route: "/api/production",
        url: "http://localhost:8082"
    },
    mec: {
        route: "/api/mec",
        url: "http://localhost:8083"
    }
};
