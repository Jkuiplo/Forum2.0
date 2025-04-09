const express = require('express');
const path = require('path');
const router = express.Router();

// Роут для главной страницы
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/front/public/index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/front/temp/login.html'));
});

router.get('/authorization', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/front/temp/auth.html'));
});

router.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/front/temp/logout.html'));
})

// Можно добавить другие страницы
// router.get('/contact', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/contact.html'));
// });

module.exports = router;
