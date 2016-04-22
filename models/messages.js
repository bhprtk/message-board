'use strict'

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
let moment = require('moment');
let date = moment().format('MMMM Do YYYY, h:mm:ss a');

var dataFile = path.join(__dirname, '../data/messages.json');

exports.findAll = function(cb) {
  fs.readFile(dataFile, (err, data) => {
    if(err) {
      cb(err);
      return;
    }

    try {
      var messages = JSON.parse(data);
      cb(null, messages);
    }catch(err) {
      return cb(err);
    }

  });
};

exports.delete = function(cb) {
  this.findAll((err, messages) => {
    if(err) {
      return cb(err);
    }
    var message = messages.filter(message => message.id === id)[0];
    cb(null, message);
  });
};

exports.create = function(message, cb) {
  this.findAll((err, messages) => {
    if(err) {
      return cb(err);
    }
    var currentTime = date;
    var newMessage = {
      name: message.name,
      topic: message.topic,
      image: message.image,
      message: message.message,
      time: currentTime,
      id: uuid()
    };

    messages.push(newMessage);

    fs.writeFile(dataFile, JSON.stringify(messages), err => {
      cb(err);
    });
  });
};
