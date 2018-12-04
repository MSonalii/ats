"use strict";
import "lusca";

/**
 * Module dependencies.
 */
const config = require("../config/config"),
    express = require("express"),
    morgan = require("morgan"),
    logger = require("./logger"),
    bodyParser = require("body-parser"),
    compress = require("compression"),
    methodOverride = require("method-override"),
    helmet = require("helmet"),
    hbs = require("express-hbs"),
    path = require("path"),
    _ = require("lodash");



/**
 * Initialize local variables
 */
const initLocalVariables = function (app) {
    // Setting application local variables
    app.locals.env = process.env.NODE_ENV;
    app.locals.domain = config.domain;

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.host = req.protocol + "://" + req.hostname;
        res.locals.url = req.protocol + "://" + req.headers.host + req.originalUrl;
        next();
    });
};

/**
 * Initialize application middleware
 */
const initMiddleware = function (app) {
    // Should be placed before express.static
    app.use(compress({
        filter: function (req, res) {
            return (/json|text|javascript|css|font|svg/).test(res.getHeader("Content-Type"));
        },
        level: 9
    }));


    // Enable logger (morgan) if enabled in the configuration file
    if (_.has(config, "log.format")) {
        app.use(morgan(logger.getLogFormat(), logger.getMorganOptions()));
    }

    // Environment dependent middleware
    if (process.env.NODE_ENV === "development") {
        // Disable views cache
        app.set("view cache", false);
    } else if (process.env.NODE_ENV === "production") {
        app.locals.cache = "memory";
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

};

/**
 * Configure view engine
 */
const initViewEngine = function (app) {
    app.engine("server.view.html", hbs.express4({
        extname: ".server.view.html"
    }));
    app.set("view engine", "server.view.html");
    app.set("views", path.resolve("./"));
};



/**
 * Configure Helmet headers configuration for security
 */
const initHelmetHeaders = function (app) {
    // six months expiration period specified in seconds
    var SIX_MONTHS = 15778476;

    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.use(helmet.hsts({
        maxAge: SIX_MONTHS,
        includeSubdomains: true,
        force: true
    }));
    app.disable("x-powered-by");
};



/**
 * Initialize the Express application
 */

module.exports.init = function () {
    // Initialize express app
    var app = express();

    // Initialize local variables
    initLocalVariables(app);

    // Initialize Express middleware
    initMiddleware(app);

    // Initialize Express view engine
    initViewEngine(app);

    // Initialize Helmet security headers
    initHelmetHeaders(app);

    return app;
};