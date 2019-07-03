const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static('public'));

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: `${__dirname}/views/layouts/`,
    partialsDir: `${__dirname}/views/includes/`
}));

app.set('view engine', 'hbs');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

// 404 route
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(port, () => {
    console.log(`This app running on localhost:${port}`);
});
