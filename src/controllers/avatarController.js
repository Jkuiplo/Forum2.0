const Avatar = require('../models/Avatar');

exports.setAvatar = (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: "Файл не загружен" });
	}

	const avatarPath = `uploads/avatars/${req.file.filename}`;
	const userId = req.user.id;

	Avatar.updateAvatar(userId, avatarPath, (err) => {
		if (err) {
			return res.status(500).json({ message: "Ошибка обновления аватара" });
		}
		res.status(200).json({ message: "Аватар обновлен", avatar: avatarPath });
	});
};
