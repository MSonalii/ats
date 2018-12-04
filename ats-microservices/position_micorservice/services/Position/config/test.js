
const config = {
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || "mongodb://" + (process.env.DB_1_PORT_27017_TCP_ADDR || "ds161539.mlab.com:61539") + "/position-micro-service-ut",
        options: {
            user: "admin",
            pass: "admin"
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    port:3020
};

export {config}; 