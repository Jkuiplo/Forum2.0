require('./models/Thread');
const path = require("path");
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");


const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const routes = require("./routes/routes");
app.use("/", routes);

const authRoutes = require('./routes/authRoutes');
app.use("/api/auth", authRoutes);

const threadRoutes = require("./routes/threadRoutes");
app.use("/api/threads", threadRoutes);

const commentRoutes = require("./routes/commentRoutes");
app.use("/api/comments", commentRoutes);


app.use('/public', express.static(path.join(__dirname, '..', '/front/public')));

app.use('/src', express.static(path.join(__dirname, '..', '/front/src')));

app.use('/img', express.static(path.join(__dirname, '..', '/front/public/img')));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

/*google Auth*/ 
app.use(cookieParser());
app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: true }));

const passport = require("./routes/googleAuth");

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/routes/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
	(req, res) => {
	  const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "7d" });
	  res.cookie("token", token, {
	    httpOnly: false,
	    secure: false, // если HTTPS — ставь true
	  });
	  res.redirect("/"); // или куда надо
	}
      );

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));