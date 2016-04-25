'use strict';

const PORT = process.env.PORT || 4000;

// requires:   loading libraries
var express = require('express');
var bodyParser = require('body-parser');

var Messages = require('./models/message');

// app declaration
var app = express();

// general purpose middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('view engine', 'jade');

// routes
app.route('/')
  .get((req, res, next) => {
    res.render('index');
  });

app.use('/messages', require('./routes/messages'));



// 404 handler
app.use((req, res, next) => {
  res.status(404).send("Error 404 and shit\n");
});

// create server, and listen to PORT
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
