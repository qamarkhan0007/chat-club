var express = require('express');
var responseTime = require('response-time');
var http = require('http');
var socketIo = require('socket.io');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var model = require('./model');

var app = express();

app.use(responseTime());

mongoose.connect('mongodb://localhost:27017/chat');


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

var router = require('./router.js');

var server = http.createServer(app);
var io = socketIo(server);
io.on('connection', function(socket){

  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});
  });

  socket.on('set-nickname', function(nickname){
    socket.nickname = nickname;
    io.emit('users-changed', {user: nickname, event: 'joined'});
  });

  // socket.on('add-message', function(message){
  //   console.log('message', message);
  //   io.emit('message', message);
  // });
  socket.on('add-message', function(message){
    model.handleMe(message);
    io.emit('message', message);
  });
  // socket.on('add-message', model.handleMe);
});
app.use(multer({dest: "./uploadMe"}).array("uploads[]", 12));
app.use('/', router);

server.listen(3000, function(){
  console.log('Server is running on 3000');
});
