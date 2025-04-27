const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const authMiddleware = require("../middleware/authMiddleware");


// POST /api/vote/thread
router.post('/thread', authMiddleware, voteController.voteOnThread);

// POST /api/vote/comment
router.post('/comment', authMiddleware, voteController.voteOnComment);

module.exports = router;
