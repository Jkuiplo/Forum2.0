const db = require('../database');

db.run(`
	CREATE TABLE IF NOT EXISTS votes (
	    id INTEGER PRIMARY KEY AUTOINCREMENT,
	    title TEXT NOT NULL,
	    content TEXT NOT NULL,
	    user_id INTEGER NOT NULL,
	    image TEXT,
	    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	)
    `, (err) => {
	if (err) {
		console.error('Ошибка при создании таблицы votes:', err.message);
	} else {
		console.log('✅ Таблица votes готова');
	}
});

const Votes = {
	findVote: (userId, threadId, callback) => {
		db.get(`SELECT * FROM votes WHERE FK_users_id = ? AND FK_thread_id = ?`,
			[userId, threadId], callback
		);
	},
	addVote: (userId, threadId, vote, callback) => {
		db.run(`INSERT INTO votes (vote, FK_users_id, FK_thread_id) VALUES (?, ?, ?)`,
			[vote, userId, threadId], function (err) {
				callback(err, this?.lastID)
			});
	},
	deleteVote: (userId, threadId, callback) => {
		db.run(`DELETE FROM votes WHERE FK_users_id = ?  AND FK_thread_id = ?`,
			[userId, threadId], callback
		);
	},
	getTotalVotes: (threadId, callback) => {
		db.all(`SELECT SUM(vote) as totalVotes FROM votes WHERE FK_thread_id = ?`,
			[threadId], callback
		);
	},

};



module.exports = Votes;