const db = require('../database');

const Avatar = {
	updateAvatar: (userId, path, callback) => {
		const query = `UPDATE users SET avatar = ? WHERE id = ?`;
		db.run(query, [path, userId], function (err) {
			callback(err);
		});
	}
};

module.exports = Avatar;
