
const config = {
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || "mongodb://" + (process.env.DB_1_PORT_27017_TCP_ADDR || "ds129434.mlab.com:29434") + "/position-micro-service",
        options: {
            user: "admin",
            pass: "admin"
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    port:3012
};


export {config}; 