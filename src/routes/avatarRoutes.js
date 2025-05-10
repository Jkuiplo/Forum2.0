const express = require('express');
const multer = require('multer');
const path = require('path');
const avatarController = require('../controllers/avatarController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Хранилище Multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../uploads/avatars'));
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		cb(null, req.user.id + '_' + Date.now() + ext);
	}
});

const upload = multer({ storage });

// POST /api/avatar — загрузка аватарки
router.post('/', authMiddleware, upload.single('avatar'), avatarController.setAvatar);

module.exports = router;
