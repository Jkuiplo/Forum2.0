const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

module.exports = (app) => {
	app.use(express.json());
	app.use(cors());
	app.use(cookieParser());
	app.use(
		session({ secret: "keyboard cat", resave: false, saveUninitialized: true })
	);
};