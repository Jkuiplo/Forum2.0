const express = require("express");
const router = express.Router();
const { changeNickname, toggleFollow, getFollowersCount } = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware"); // если есть проверка токена

router.put("/nickname", authenticate, changeNickname);
router.post("/:id/follow", authenticate, toggleFollow);
router.get("/:id/followers/count", getFollowersCount);

module.exports = router;
