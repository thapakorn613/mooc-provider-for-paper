module.exports = {
    NODE_ENV: "develop",
    // NODE_ENV: "production",
    DEVELOPER: {
        URL_PATH: "http://localhost:",
        DB_PORT: '3443',
        HOST_PORT: 5000
    },
    PRODUCTION: {
        URL_PATH: "https://broker.tcu.cm.edu/api",
        HOST_PORT: 3000
    },

};
