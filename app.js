'use strict';

const PORT = process.env.PORT || 4000;

// requires:   loading libraries
var express = require('express');
var bodyParser = require('body-parser');

var Messages = require('./models/messages');

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

app.route('/messages')
  .get((req, res, next) => {
    res.render('messages');
  })
  .post((req, res, next) => {
    Messages.create(req.body, err => {
      if(err){
        return res.status(400).send(err);
      }
      res.send();
    });
  });

  // app.route('messages/:id')
  // .delete((req, res, next) => {
  //   var id = req.query;
  //   console.log(id);
  //     // Messages.removeById(id, err => {
  //     // });
  //
  // });

app.route('/messages/get')
  .get((req, res, next) => {
    Messages.findAll((err, messages) => {
      if(err)return res.status(404).send('Cannot find the fucking messages.');
      res.send(messages);
    })
  });

app.route('/add')
  .get((req, res, next) => {
    res.render('add');
  });


// 404 handler
app.use((req, res, next) => {
  res.status(404).send("Error 404 and shit\n");
});

// create server, and listen to PORT
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
