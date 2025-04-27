const express = require('express');
const path = require('path');
const router = express.Router();

// Роут для главной страницы
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/public/index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/public/pages/login/login.html'));
});

router.get('/authorization', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/public/pages/auth/auth.html'));
});

router.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/public/pages/logout/logout.html'));
})

// Можно добавить другие страницы
// router.get('/contact', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/contact.html'));
// });

module.exports = router;
