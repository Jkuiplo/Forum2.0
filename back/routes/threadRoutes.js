const express = require("express");
const Thread = require("../models/Thread");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Создать тред
router.post("/", authMiddleware, (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Введите заголовок и текст" });
    }

    Thread.create(title, content, req.user.id, (err, threadId) => {
        if (err) return res.status(500).json({ message: "Ошибка сервера" });
        res.status(201).json({ id: threadId, title, content, user_id: req.user.id });
    });
});

// 📌 Получить все треды
router.get("/", (req, res) => {
    Thread.getAll((err, threads) => {
        if (err) return res.status(500).json({ message: "Ошибка сервера" });
        res.json(threads);
    });
});

// 📌 Получить тред по ID
router.get("/:id", (req, res) => {
    Thread.getById(req.params.id, (err, thread) => {
        if (err || !thread) return res.status(404).json({ message: "Тред не найден" });
        res.json(thread);
    });
});

// 📌 Обновить тред (только автор)
router.put("/:id", authMiddleware, (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Введите заголовок и текст" });
    }

    Thread.getById(req.params.id, (err, thread) => {
        if (err || !thread) return res.status(404).json({ message: "Тред не найден" });

        if (thread.user_id !== req.user.id) {
            return res.status(403).json({ message: "Нет доступа" });
        }

        Thread.update(req.params.id, title, content, (err) => {
            if (err) return res.status(500).json({ message: "Ошибка сервера" });
            res.json({ message: "Тред обновлен" });
        });
    });
});

// 📌 Удалить тред (только автор)
router.delete("/:id", authMiddleware, (req, res) => {
    Thread.getById(req.params.id, (err, thread) => {
        if (err || !thread) return res.status(404).json({ message: "Тред не найден" });

        if (thread.user_id !== req.user.id) {
            return res.status(403).json({ message: "Нет доступа" });
        }

        Thread.delete(req.params.id, (err) => {
            if (err) return res.status(500).json({ message: "Ошибка сервера" });
            res.json({ message: "Тред удален" });
        });
    });
});

module.exports = router;
