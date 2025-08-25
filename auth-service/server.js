const app = require('./app');

const PORT = process.env.PORT_AUTH || 8080;

app.listen(PORT, () => {
    console.log(`🚀 Auth service running on port ${PORT}`);
});
