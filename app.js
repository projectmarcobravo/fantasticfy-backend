const express = require('express');
const app = express();

require('./config')(app);

module.exports = app;