const express = require("express");
const PORT = process.env.PORT || 5000;
const passport = require("./config/passport");
const applyMiddleware = require("./middleware/indexMiddleware");
const applyRoutes = require("./routes");
const applyStatic = require("./routes/static");

const app = express();

// Apply middleware
applyMiddleware(app);

// Apply routes
applyStatic(app);

applyRoutes(app);

// Google Auth
app.use(passport.initialize());
app.use(passport.session());

app.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
		prompt: "select_account",
	})
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
	(req, res) => {
		const jwt = require("jsonwebtoken");
		const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "7d" });
		res.cookie("token", token, {
			httpOnly: false,
			secure: false,
			maxAge: 7 * 24 * 60 * 60 * 1000
		});
		res.redirect("/");
	}
);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
