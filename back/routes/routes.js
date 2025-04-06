const express = require('express');
const path = require('path');
const router = express.Router();

// Роут для главной страницы
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/front/public/index.html'));
});


// Можно добавить другие страницы
// router.get('/contact', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/contact.html'));
// });

module.exports = router;
