const Votes = require('../models/Votes');

async function voteOnThread(req, res) {
	const { threadId } = req.body;
	const vote = parseInt(req.body.vote);
	const userId = req.user.id;

	if (![1, -1].includes(vote)) {
		return res.status(400).json({ error: 'Invalid vote val' });
	}

	try {
		const result = await Votes.addVote({
			userId,
			threadId,
			vote
		});
		const totalVotes = await Votes.getTotalVotes({ threadId });

		res.json({
			message: 'Vote updated',
			vote: result.updatedVote,
			totalVotes
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'ЧТО НЕ ТАК ТО' });
	}
}

async function voteOnComment(req, res) {
	const { commentId } = req.body;
	const vote = parseInt(req.body.vote);
	const userId = req.user.id;

	if (![1, -1].includes(vote)) {
		return res.status(400).json({ error: 'Invalid vote value' });
	}

	try {
		const result = await Votes.addVote({
			userId,
			commentId,
			vote
		});

		const totalVotes = await Votes.getTotalVotes({ commentId });

		res.json({
			message: 'Vote updated',
			vote: result.updatedVote,
			totalVotes
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'что то не так с лайками...' });
	}
}

module.exports = {
	voteOnThread,
	voteOnComment
};