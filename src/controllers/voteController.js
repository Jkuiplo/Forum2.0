const Votes = require('../models/Votes');

function voteOnThread(req, res) {
	const { threadId, vote } = req.body;
	const userId = req.user.id;

	if (![1, -1].includes(parseInt(vote))) {
		return res.status(400).json({ message: 'Invalid vote value' });
	}

	// Check if the user has already voted
	Votes.findVote(userId, threadId, (err, existingVote) => {
		if (err) {
			console.error('Error checking existing vote:', err);
			return res.status(500).json({ message: 'Server error' });
		}

		if (existingVote) {
			if (existingVote.vote === vote) {
				// If the vote is the same, remove it
				Votes.deleteVote(userId, threadId, (err) => {
					if (err) {
						console.error('Error deleting vote:', err);
						return res.status(500).json({ message: 'Server error' });
					}

					Votes.getTotalVotes(threadId, (err, result) => {
						if (err) {
							console.error('Error fetching total votes:', err);
							return res.status(500).json({ message: 'Server error' });
						}

						const totalVotes = result[0]?.totalVotes || 0;
						return res.status(200).json({ message: 'Vote removed', totalVotes });
					});
				});
			} else {
				// If the vote is opposite, update it
				Votes.deleteVote(userId, threadId, (err) => {
					if (err) {
						console.error('Error deleting opposite vote:', err);
						return res.status(500).json({ message: 'Server error' });
					}

					Votes.addVote(userId, threadId, parseInt(vote), (err, voteId) => {
						if (err) {
							console.error('Error adding vote:', err);
							return res.status(500).json({ message: 'Server error' });
						}

						Votes.getTotalVotes(threadId, (err, result) => {
							if (err) {
								console.error('Error fetching total votes:', err);
								return res.status(500).json({ message: 'Server error' });
							}

							const totalVotes = result[0]?.totalVotes || 0;
							return res.status(201).json({ message: 'Vote updated', voteId, totalVotes });
						});
					});
				});
			}
		} else {
			// If no vote exists, add a new one
			Votes.addVote(userId, threadId, parseInt(vote), (err, voteId) => {
				if (err) {
					console.error('Error adding vote:', err);
					return res.status(500).json({ message: 'Server error' });
				}

				Votes.getTotalVotes(threadId, (err, result) => {
					if (err) {
						console.error('Error fetching total votes:', err);
						return res.status(500).json({ message: 'Server error' });
					}

					const totalVotes = result[0]?.totalVotes || 0;
					return res.status(201).json({ message: 'Vote added', voteId, totalVotes });
				});
			});
		}
	});
}

function voteOnComment(req, res) {
	const { commentId, vote } = req.body;
	const userId = req.user.id;

	if (![1, -1].includes(parseInt(vote))) {
		return res.status(400).json({ message: 'Invalid vote value' });
	}

	Votes.addVote(userId, null, parseInt(vote), (err, voteId) => {
		if (err) {
			console.error('Error adding vote:', err);
			return res.status(500).json({ message: 'Server error' });
		}

		Votes.getTotalVotes(commentId, (err, result) => {
			if (err) {
				console.error('Error fetching total votes:', err);
				return res.status(500).json({ message: 'Server error' });
			}

			const totalVotes = result[0]?.totalVotes || 0;
			res.status(201).json({ message: 'Vote updated', voteId, totalVotes });
		});
	});
}

module.exports = {
	voteOnThread,
	voteOnComment
};