const express = require("express");
const PORT = require(process.env.PORT || 3000);
const passport = require("./config/passport");
const applyMiddleware = require("./middleware/indexMiddleware");
const applyRoutes = require("./routes");

const app = express();

// Apply middleware
applyMiddleware(app);

// Apply routes
applyRoutes(app);

// Static files
app.use("/public", express.static(staticPaths.public));
app.use("/src", express.static(staticPaths.src));
app.use("/img", express.static(staticPaths.img));
app.use("/uploads", express.static(staticPaths.uploads));

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
		});
		res.redirect("/");
	}
);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));