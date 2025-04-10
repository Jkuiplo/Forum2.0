const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const db = require("../database");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
	const email = profile.emails?.[0]?.value;
	const username = profile.displayName;
      
	// Проверка: есть ли уже пользователь с таким email
	db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
	  if (err) return done(err);
      
	  if (row) {
	    // Пользователь уже есть — возвращаем его
	    return done(null, row);
	  } else {
	    // Вставка нового пользователя
	    db.run(
	      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
	      [username, email, null], // пароль null, т.к. OAuth
	      function (err) {
		if (err) return done(err);
      
		const newUser = {
		  id: this.lastID,
		  username,
		  email,
		};
      
		return done(null, newUser);
	      }
	    );
	  }
	});
      }      
  )
);

// не обязательно сериализовывать в БД, можно просто вернуть объект
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;
