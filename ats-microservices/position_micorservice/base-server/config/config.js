"use strict";
import "fs";
import "path";

/**
 * Module dependencies.
 */
var _ = require("lodash"),
    chalk = require("chalk"),
    glob = require("glob");

/**
 * Get files by glob patterns
 */
var getGlobbedPaths = function (globPatterns, excludes) {
    // URL paths regex
    var urlRegex = new RegExp("^(?:[a-z]+:)?", "i");

    // The output array
    var output = [];

    // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, getGlobbedPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            var files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map(function (file) {
                    if (_.isArray(excludes)) {
                        for (var i in excludes) {
                            if (excludes.hasOwnProperty(i)) {
                                file = file.replace(excludes[i], "");
                            }
                        }
                    } else {
                        file = file.replace(excludes, "");
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }

    return output;
};

/**
 * Validate NODE_ENV existence
 */
var validateEnvironmentVariable = function () {
    var environmentFiles = glob.sync("./base-server/config/env/" + process.env.NODE_ENV + ".js");
    if (!environmentFiles.length) {
        if (process.env.NODE_ENV) {
            console.error(chalk.red("+ Error: No configuration file found for \"" + process.env.NODE_ENV + "\" environment using development instead")); // eslint-disable-line no-console
        } else {
            console.error(chalk.red("+ Error: NODE_ENV is not defined! Using default development environment")); // eslint-disable-line no-console
        }
        process.env.NODE_ENV = "development";
    }
    // Reset console color
    console.log(chalk.white("")); // eslint-disable-line no-console
};

/** Validate config.domain is set
 */
// var validateDomainIsSet = function (config) {
// 	if (!config.domain) {
// 		console.log(chalk.red("+ Important warning: config.domain is empty. It should be set to the fully qualified domain of the app.")); // eslint-disable-line no-console
// 	}
// };







/**
 * Initialize global configuration
 */
var initGlobalConfig = function () {
    // Validate NODE_ENV existence
    validateEnvironmentVariable();



    // Get the default config

    var defaultConfig = require("./env/default");

    // Get the current config
    var environmentConfig = require( "./env/" + process.env.NODE_ENV) || {};

    // Merge config files
    var config = _.merge(defaultConfig, environmentConfig);





    // Expose configuration utilities
    config.utils = {
        getGlobbedPaths: getGlobbedPaths
    };

    return config;
};

/**
 * Set configuration object
 */
module.exports = initGlobalConfig();
