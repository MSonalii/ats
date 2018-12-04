
const config = {
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || "mongodb://" + (process.env.DB_1_PORT_27017_TCP_ADDR || "ds121834.mlab.com:21834") + "/practice-micro-service",
        options: {
            user: "SonaliMaid",
            pass: "Sonali@1234"
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    port:3013
};


export {config}; 