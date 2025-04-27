const path = require('path');
const express = require('express');

function setStaticPaths(app) {
	app.use('/public', express.static(path.join(__dirname, '..', '..', '/public')));
	app.use('/src', express.static(path.join(__dirname, '..', '..', '/public/pages')));
	app.use('/img', express.static(path.join(__dirname, '..', '..', '/public/img')));
	app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')));
}

module.exports = setStaticPaths;
