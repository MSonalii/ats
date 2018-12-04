"use strict";
import "path";
import Logger from "./logger";

/**
 * Module dependencies.
 */
var _ = require("lodash"),
    config = require("../config/config"),
    chalk = require("chalk"),
    mongoose = require("mongoose");



// Initialize Mongoose
export const connect =  (configuration) => {
    mongoose.Promise = config.db.promise;
    configuration = configuration || {};
    var options = _.merge(config.db.options || configuration, { useMongoClient: true });
    mongoose
        .connect(config.db.uri, options)
        .then(function (connection) {
            // Enabling mongoose debug mode if required
            mongoose.set("debug", config.db.debug);

            return connection.db;
        })
        .catch(function (err) {
            Logger.error(chalk.red("Could not connect to MongoDB!"));
            Logger.info(err);
            throw err;
        });

};

export const disconnect =  (cb) => {
    mongoose.connection.db
        .close(function (err) {
            Logger.info(chalk.yellow("Disconnected from MongoDB."));
            return cb(err);
        });
};
