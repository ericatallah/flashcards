const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
    const random = Math.floor(Math.random() * 5);
    res.redirect(`/cards/${random}?side=question`);
});

router.get('/:id', (req, res) => {
    const side = req.query.side === 'question' || req.query.side === 'answer' ? req.query.side : 'question';
    const id = +req.params.id;
    const text = cards[id][side];
    const { hint } = cards[id];
    const flipTo = side === 'question' ? 'answer' : 'question';
    const sideDisplay = side === 'question' ? 'Question' : 'Answer';
    const sideQuestion = side === 'question' ? true : false;
    const username = req.cookies.username;
    
    const templateData = side === 'question' ? { id, text, flipTo, hint, username, sideQuestion, sideDisplay } : { id, text, flipTo, username, sideQuestion, sideDisplay };

    res.render('card', templateData);
});

module.exports = router;