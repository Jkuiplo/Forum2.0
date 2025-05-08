const express = require("express");
const Comment = require("../models/Comment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Добавить комментарий к треду
router.post("/:threadId", authMiddleware, (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: "Комментарий не может быть пустым" });
    }

    Comment.create(req.params.threadId, req.user.id, content, (err, commentId) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
        res.status(201).json({ id: commentId, thread_id: req.params.threadId, user_id: req.user.id, content });
    });
});

// 📌 Получить все комментарии к треду
router.get("/:threadId", (req, res) => {
    Comment.getByThreadId(req.params.threadId, (err, comments) => {
        if (err) {
            return res.status(500).json({ message: "Ошибка сервера" });
        }
        res.json(comments);
    });
});

// 📌 Обновить комментарий (только автор)
router.put("/:commentId", authMiddleware, (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: "Комментарий не может быть пустым" });
    }

    Comment.getById(req.params.commentId, (err, comment) => {
        if (err || !comment) return res.status(404).json({ message: "Комментарий не найден" });

        if (comment.FK_users_id !== req.user.id) {
            return res.status(403).json({ message: "Нет доступа" });
        }

        Comment.update(req.params.commentId, content, (err) => {
            if (err) return res.status(500).json({ message: "Ошибка сервера" });
            res.json({ message: "Комментарий обновлен" });
        });
    });
});

// 📌 Удалить комментарий (только автор)
router.delete("/:commentId", authMiddleware, (req, res) => {
    Comment.getById(req.params.commentId, (err, comment) => {
        if (err || !comment) return res.status(404).json({ message: "Комментарий не найден" });

        if (comment.FK_users_id !== req.user.id) {
            return res.status(403).json({ message: "Нет доступа" });
        }

        Comment.delete(req.params.commentId, (err) => {
            if (err) return res.status(500).json({ message: "Ошибка сервера" });
            res.json({ message: "Комментарий удален" });
        });
    });
});

module.exports = router;
