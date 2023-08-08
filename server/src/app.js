const express = require("express");
const createError = require('http-errors');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute;
    max: 5,
    message: 'Too many request from your IP. Please try in later'
})

app.use(rateLimiter);
app.use(xssClean());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/test', (req, res) => {
    res.status(200).send({
        message: 'Api is working',
    })
})

app.get('/api/user', (req, res) => {
    console.log(req.body.id);
    res.status(200).send({
        message: 'User profile is returned',
    })
})


app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to our new server',
    })
})

app.get('/products', (req, res) => {
    res.status(200).send({
        message: 'Products are returned',
    });
})

//Client error handeling
app.use((req, res, next) => {
    next(createError(404, 'route not found'));
})

//Server error handeling -> all the error
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    })
})

module.exports = app;