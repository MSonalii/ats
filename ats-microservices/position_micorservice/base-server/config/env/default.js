"use strict";

module.exports = {

    db: {
        promise: global.Promise
    },
    port: process.env.PORT || 3000,
    host: process.env.HOST || "0.0.0.0",
    log: {
        format: "dev",
        fileLogger: {
            directoryPath: process.cwd(),
            fileName: "app.log",
            maxsize: 10485760,
            maxFiles: 2,
            json: false
        }
    }
};
