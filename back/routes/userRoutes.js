const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
const db = new sqlite3.Database('./database.db');

//секретный ключ для шифрования
const SECRET_KEY = process.env.JWT_SECRET || 'secret';

router.post("/register", async (req, res) => {
	const {username, email, password} = req.body;

	if(!username || !email || !password) {
		return res.status(400).json({message: 'Заполните все поля'});
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	db.run(
		`INSERT INTO users (username, email, password) VALUES (?,?,?)`,
		[username, email, hashedPassword],
		function (err) {
			if(err){
				return res.status(400).json({message: 'Ошибка: ' + err.message});
			}
			res.json({message: 'Пользователь зарегестрирован'});
		}
	);
});

router.post("/login", (req, res) => {
	const {email, password} = req.body;

	if(!email || !password){
		return res.status(400).json({message: "Введите email и пароль"});
	}

	db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
		if(err || !user) {
			return res.status(400).json({message: "Такого пользователя не сущуствует" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if(!isMatch) {
			return res.status(401).json({message: "Неверный пароль"});
		}

		const token = jwt.sign({id: user.id, username: user.username}, SECRET_KEY, {expiresIn: '30d'});
		res.json({token, user: {id: user.id, username: user.username, email: user.email} });
	});
});


module.exports = router;