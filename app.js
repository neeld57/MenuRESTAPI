//require express and create an instance of it
const express = require('express');
const app = express();
//set up routing to help keep code clean
const menuRouting = require('./menu');
//send all requests of /menusection to be dealt with in menu.js
app.use('/menusection', menuRouting);
module.exports = app;
