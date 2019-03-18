const PROXY_CONFIG = {
    "/api": {
        target: "http://localhost:1080",
        secure: false,
        logLevel: "info"
    }
};

module.exports = PROXY_CONFIG;
