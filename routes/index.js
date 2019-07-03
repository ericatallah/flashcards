const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const username = req.cookies.username;

    if (username) {
        res.render('index', { username });
    } else {
        res.redirect('/hello');
    }
});

router.get('/hello', (req, res) => {
    const username = req.cookies.username;

    if (username) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

router.post('/hello', ({ body }, res) => {
    res.cookie('username', body.username);
    res.redirect('/');
});

router.post('/goodbye', ({ body }, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

module.exports = router;