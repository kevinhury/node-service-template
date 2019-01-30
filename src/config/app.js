const path = require('path');

// import .env variables
require('dotenv-safe').load({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    logFilePath: process.env.LOG_FILE_PATH,
    jwtSecret: process.env.JWT_SECRET,
    mongo: {
        uri: process.env.DB_URI,
    },
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
