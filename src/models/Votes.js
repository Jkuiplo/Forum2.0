const db = require('../database');


async function addVote({ userId, threadId = null, commentId = null, vote }) {

	const existing = await db.prepare(`
		SELECT * FROM votes
		WHERE FK_users_id = ?
		  AND (
		    (FK_thread_id IS NOT NULL AND FK_thread_id = ? AND FK_comment_id IS NULL)
		    OR
		    (FK_comment_id IS NOT NULL AND FK_comment_id = ? AND FK_thread_id IS NULL)
		  )
	      `).get(userId, threadId, commentId);

	if (existing) {
		if (existing.vote === vote) {
			db.prepare(`
					DELETE FROM votes
					WHERE id = ?
					`).run(existing.id);
			return { updatedVote: 0 };
		} else {
			db.prepare(`
					UPDATE votes
					SET vote = ?
					WHERE id = ?
					`).run(vote, existing.id);
			return { updatedVote: vote };
		}
	} else {
		db.prepare(`
				INSERT INTO votes (vote, FK_users_id, FK_thread_id, FK_comment_id)
				VALUES (?, ?, ?, ?)
				`).run(vote, userId, threadId, commentId);
		return { updatedVote: vote };
	}
}

function getTotalVotes({ threadId = null, commentId = null }) {
	const result = db.prepare(`
		SELECT SUM(vote) as total
		FROM votes
		WHERE FK_thread_id IS ? AND FK_comment_id IS ?
		`).get(threadId, commentId);

	return result.total || 0;
}

module.exports = {
	addVote,
	getTotalVotes
}; function addVote({ userId, threadId = null, commentId = null, vote }) {
	let existing;

	if (threadId !== null) {
		existing = db.prepare(`
			SELECT * FROM votes
			WHERE FK_users_id = ? AND FK_thread_id = ? AND FK_comment_id IS NULL
		`).get(userId, threadId);
	} else if (commentId !== null) {
		existing = db.prepare(`
			SELECT * FROM votes
			WHERE FK_users_id = ? AND FK_comment_id = ? AND FK_thread_id IS NULL
		`).get(userId, commentId);
	}

	if (existing) {
		if (existing.vote === vote) {
			db.prepare(`DELETE FROM votes WHERE id = ?`).run(existing.id);
			return { updatedVote: 0 };
		} else {
			db.prepare(`UPDATE votes SET vote = ? WHERE id = ?`).run(vote, existing.id);
			return { updatedVote: vote };
		}
	} else {
		db.prepare(`
			INSERT INTO votes (vote, FK_users_id, FK_thread_id, FK_comment_id)
			VALUES (?, ?, ?, ?)
		`).run(vote, userId, threadId, commentId);
		return { updatedVote: vote };
	}
}
