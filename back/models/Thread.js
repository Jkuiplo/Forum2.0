const db = require('../database');

db.run(`
    CREATE TABLE IF NOT EXISTS threads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
`, (err) => {
    if (err) {
        console.error('Ошибка при создании таблицы threads:', err.message);
    } else {
        console.log('✅ Таблица threads готова');
    }
});

const Thread = {
    create: (title, content, user_id, callback) => {
        db.run(`INSERT INTO threads (title, content, user_id) VALUES (?, ?, ?)`, 
            [title, content, user_id], function (err) {
                callback(err, this?.lastID);
            }
        );
    },

    getAll: (callback) => {
        db.all(`SELECT * FROM threads ORDER BY created_at DESC`, callback);
    },

    getById: (id, callback) => {
        db.get(`SELECT * FROM threads WHERE id = ?`, [id], callback);
    },

    update: (id, title, content, callback) => {
        db.run(`UPDATE threads SET title = ?, content = ? WHERE id = ?`, 
            [title, content, id], callback);
    },

    delete: (id, callback) => {
        db.run(`DELETE FROM threads WHERE id = ?`, [id], callback);
    }
};

module.exports = Thread;
