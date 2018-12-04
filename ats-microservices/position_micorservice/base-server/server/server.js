
import express from "../lib/express";
import _ from "lodash";
import chalk from "chalk";
import config from "../config/config";
import {connect} from "../lib/mongoose";
import Logger from "../lib/logger";

class Server{

    constructor(configuration = {}){
        this.configuration = _.merge(config, configuration);
        this.init();
    }

    init() {
        this.app = express.init();
    }

    async start(router = _.noop) {
        router(this.app);
        return Promise.all([
            this._connectToDB(),
            this._listen()
        ]);
    }

    _connectToDB() {
        return connect(this.configuration);
    }

    _listen(port = this.configuration.port, host = this.configuration.host) {
        let listenPromise = new Promise((resolve)=>{

            this.app.listen(port, host, ()=>{

                var server = (process.env.NODE_ENV === "secure" ? "https://" : "http://") + host + ":" + port;
                Logger.info("--");
                Logger.info(chalk.green("Environment:     " + process.env.NODE_ENV));
                Logger.info(chalk.green("Server:          " + server));
                Logger.info(chalk.green("Database:        " + this.configuration.db.uri));
                Logger.info("--");
                resolve(this.app);       
            });

        });
        return listenPromise;
    }
    
}



export default Server;
