'use strict'

var db = require('../config/db');
var uuid = require('uuid');
let moment = require('moment');
let date = moment().format('MMMM Do YYYY, h:mm:ss a');

db.run('CREATE TABLE IF NOT EXISTS messages (image TEXT, topic TEXT, name TEXT, time TEXT, message TEXT, id TEXT)');


exports.findAll = function(cb) {
  db.all('SELECT * FROM messages', function(err, messages) {
    cb(err, messages);
  });
};

exports.findOne = function(id, cb) {
  db.all(`SELECT * FROM messages WHERE id = '${id}'`, function(err, message) {
    cb(err, message);
  });
}

exports.delete = function(id, cb) {
  db.run(`DELETE FROM messages WHERE id = '${id}'`, function(err, messages) {
    cb(err, messages);
  });
};

exports.create = function(message, cb) {
  // add validation maybe

  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO messages VALUES (?, ?, ?, ?, ?, ?)");
    stmt.run(message.image, message.topic, message.name, message.time, message.message, uuid());
    stmt.finalize(cb);
  });
};
