/* Import node's http module: */
var http = require('http');
var handleRequest = require('./request-handler');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var results = [{username: 'Jono', message: 'Do my bidding!', roomname: 'lobby', objectId: 0 }];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var id = 0;
// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = 'localhost';

app.use(express.static('../client'));
app.get('/', function(request, response) {
  console.log('a get request was made to the root path');
  response.render('index');
  response.send();
});

app.get('/classes/messages', function(request, response) {
  console.log('A get request was made to classes messages');
  response.send(JSON.stringify({results: results}));
});

app.post('/classes/messages', function(request, response) {
  console.log('A post request was made to classes messages');
  id++;
  var result = {
    username: request.body.username,
    message: request.body.message,
    roomname: request.body.roomname,
    objectId: id
  };
  results.push(result);
  response.status(201).send(JSON.stringify({results: results}));
});

app.options('/classes/messages', function(request, response) {
  console.log('A options request was made to classes messages');
  response.sendStatus(200);
});
// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */
// var server = http.createServer(handleRequest.requestHandler);
app.listen(port, ip);
console.log('Listening on http://' + ip + ':' + port);
// server.listen(port, ip);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.


