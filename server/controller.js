var schema = require('./model.js');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter();
module.exports.register = function(req, res, next) {
  var data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      mobile: req.body.mobile,
      address: req.body.address
  };
  schema.register(data, function(err, result){
    if(err){
      console.log(err.status);
      res.send({code: 400, data: err});
    }else {
      res.send({code: 200, data: result});
    }
  });
};

module.exports.login = function(req, res, next) {
  var data = {
    name: req.body.username,
    password: req.body.password
  };
  schema.login(data, function(err, result){
    if(!err && result !== null) {
      console.log('response in controller', res.header);
      res.send({code: 200, data: result});
    }else {
      res.send({code: 400, data: null});
    }
  });
};
module.exports.upload = function(req, res, next) {
  // console.log('2222222', req.body);
  schema.upload(req.files, function(err, result){
    console.log('1111111', result);
    if(!err && result !== null) {
      res.send({code: 200, data: result});
    }else {
      res.send({code: 400, data: null});
    }
  });
};
module.exports.getFile = function(req, res, next) {
  schema.getFile(function(err, result){
    if(!err && result !== null) {
      fs.writeFile('generated.png', result[0].data, function(err){
          if (err)
            throw err;
      });
      res.send({code: 200, data: result[0].data});
    }else {
      res.send({code: 400, data: null});
    }
  });
};
module.exports.getUser = function(req, res, next) {
  var email = req.params.email;
  schema.getUser(email, function(err, result){
    if(!err && result !== null) {
      res.send({code: 200, data: result});
    }else {
      res.send({code: 400, data: null});
    }
  });
};
module.exports.getMessage = function(req, res, next) {
  var body = req.body;
  schema.getMessage(body, function(err, result){
    if(!err && result !== null) {
      res.send({code: 200, data: result});
    }else {
      res.send({code: 400, data: null});
    }
  });
};
