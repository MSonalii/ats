import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./src/routes/PositionRouter";
var session = require("express-session");
var Keycloak = require("keycloak-connect");

const app = express();
const PORT = 4000;
var memoryStore = new session.MemoryStore();

const keycloak = new Keycloak({
	store: memoryStore
});
app.use(cors());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(session({
	secret: "thisShouldBeLongAndSecret",
	resave: false,
	saveUninitialized: true,
	store: memoryStore
}));
app.use(keycloak.middleware({
	logout: "/logout",
	admin: "/"
}));

routes(app, keycloak);

app.get("/", (req, res) => {
	res.send(`Hello welcome to node with es6 ${PORT}`);
});

app.listen(PORT, () =>
	console.log(`Server is running on ${PORT}`)
);
module.exports.default = app;




// let express = require("express");
// let app = express();

// let bookData = require('./data/books.json');

// app.set('port', process.env.PORT || 4000);
// app.set('appData', bookData);

// app.use(require('./routes/welcome'));
// app.use(require('./routes/book'));

// app.listen(app.get('port'), () => console.log("Listing on port", app.get('port')));