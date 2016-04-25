'use strict';

var express = require('express');
var router = express.Router();

var Message = require('../models/message');
// /messages
router.get('/', (req, res) => {
  res.render('messages');
});

router.post('/', (req, res) => {
  Message.create(req.body, (err, messages) => {
    if(err) return res.status(400).send(err);
    res.send(messages);
  });
});

// /messages
router.delete('/', (req, res) => {
  Message.delete(req.body.id, (err, messages) => {
    if(err) return res.status(400).send(err);
    res.send(messages);
  });
});

// /messages/get
router.get('/get', (req, res) => {
  Message.findAll(function(err, messages) {
    if(err) return res.status(400).send(err);
    res.send(messages);
  });
});

// /messages/put
router.put('/', (req, res) => {
  Message.put(req.body, (err, messages) => {
    if(err) return res.status(400).send(err);
    res.send(messages);
  });
});

router.get('/getone', (req, res) => {
  Message.findOne(req.query.id, (err, message) => {
    if(err) return res.status(400).send(err);
    res.send(message);
  });
});

module.exports = router;
