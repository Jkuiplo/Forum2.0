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
			return res.status(400).json({message: "Такого пользователя не существует" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if(!isMatch) {
			return res.status(401).json({message: "Неверный пароль"});
		}

		const token = jwt.sign({id: user.id, username: user.username}, SECRET_KEY, {expiresIn: '30d'});
		res.json({token, user: {id: user.id, username: user.username, email: user.email} });
	});
});


// Middleware для проверки JWT
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Нет доступа' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Неверный токен' });
    }
};

// 📌 Получение профиля текущего пользователя
router.get('/me', authMiddleware, (req, res) => {
    db.get(`SELECT id, username, email FROM users WHERE id = ?`, [req.user.id], (err, user) => {
        if (err || !user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.json(user);
    });
});

module.exports = router;
