const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/card', (req, res) => {
    res.render('card', { name: 'Bossman' });
});

// 404 route
app.get('*', (req, res) => {
    console.log('are we in here?');
    res.render('404');
});

app.listen(3000, () => {
    console.log('This app running on localhost:3000');
});
