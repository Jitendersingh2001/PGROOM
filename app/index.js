let config = require('./config/initEnv');
const app = require('./app');

const PORT = config.server.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});