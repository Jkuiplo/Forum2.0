const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	PORT: process.env.PORT || 5000,
	JWT_SECRET: process.env.JWT_SECRET,
	staticPaths: {
		public: path.join(__dirname, "..", "..", "/public"),
		src: path.join(__dirname, "..", "..", "/public/pages"),
		img: path.join(__dirname, "..", "..", "/public/img"),
		uploads: path.join(__dirname, "..", "/uploads"),
	},
};