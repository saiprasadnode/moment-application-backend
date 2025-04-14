const express = require('express');
const path = require('path');
const logger = require('morgan');
const userRouter = require('./routes/user');

const app = express();

//To avoid cors origin issue 
const cors = require('cors');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//base router
app.use('/users', userRouter);

module.exports = app;
