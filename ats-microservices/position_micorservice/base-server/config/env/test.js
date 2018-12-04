"use strict";
import "./default";

module.exports = {
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || "mongodb://" + (process.env.DB_1_PORT_27017_TCP_ADDR || "localhost") + "/base-server-test",
        options: {},
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    log: {
        format: "dev",
        fileLogger: {
            directoryPath: process.cwd(),
            fileName: "app.log",
            maxsize: 10485760,
            maxFiles: 2,
            json: false
        }
    },
    port: process.env.PORT || 3001,

};
