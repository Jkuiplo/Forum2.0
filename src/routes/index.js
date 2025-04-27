const express = require("express");
const routes = require("./routes");
const authRoutes = require("./authRoutes");
const threadRoutes = require("./threadRoutes");
const commentRoutes = require("./commentRoutes");
const voteRoutes = require("./voteRoutes");

module.exports = (app) => {
	app.use("/", routes);
	app.use("/api/auth", authRoutes);
	app.use("/api/threads", threadRoutes);
	app.use("/api/comments", commentRoutes);
	app.use("/api/votes", voteRoutes);
};