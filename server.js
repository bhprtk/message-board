'use strict';

const PORT = process.env.PORT || 5000;

let jade = require('jade');
let http = require('http');
let qs = require('qs');

let moment = require('moment');
let nodeStatic = require('node-static');
let file = new nodeStatic.Server('./public');

http.createServer((req, res) => {
  let html;
  let path = req.url;
  let date = moment().format('MMMM Do YYYY, h:mm:ss a');

  switch (path) {
    case '/':
      html = jade.renderFile('./views/index.jade', {

      });
      res.end(html);
      break;

    case '/messages':
      html = jade.renderFile('./views/messages.jade', {
        date: date
      });
      res.end(html);
      break;
    case '/add':
      html = jade.renderFile('./views/add.jade', {
        date: date
      });
    res.end(html);
    break;
    default:
      console.log('path not found!');
  }
  file.serve(req, res);

})
.listen(PORT, err => {
  if(err) return console.log(err);
  console.log(`Node server listening on port ${PORT}`);
});
