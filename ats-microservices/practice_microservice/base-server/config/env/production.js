"use strict";
import "fs";

module.exports = {

    port: process.env.PORT || 8443,
    host: process.env.HOST || "0.0.0.0",
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || "mongodb://" + (process.env.DB_1_PORT_27017_TCP_ADDR || "localhost") + "/base-server-prod",
        options: {
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    log: {
        format: process.env.LOG_FORMAT || "combined",
        fileLogger: {
            directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
            fileName: process.env.LOG_FILE || "app.log",
            maxsize: 10485760,
            maxFiles: 2,
            json: false
        }
    }
};
