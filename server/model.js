var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');
var Binary = require('mongodb').Binary;

var registerSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  age: { type: String },
  mobile: { type: String },
  address: { type: String }
});
var uploadsSchema = new Schema({
  fileName: { type: String },
  data: { type: Buffer }
});
var chatSchema = new Schema({
  groupId: { type: Array },
  text: { type: Array },
  userId: { type: String }
});

var mySchema = module.exports = mongoose.model('registers', registerSchema);
var uploadsSc = module.exports = mongoose.model('uploads', uploadsSchema);
var chatSc = module.exports = mongoose.model('messages', chatSchema);

module.exports.register = function(data, callback){
  console.log(data);
  var obj = new mySchema(data);
  obj.save(callback);
};

module.exports.login = function(condition, callback){
  mySchema.findOne({email: condition.name}, callback);
};

module.exports.upload = function(data, callback){
  var path = fs.readFileSync(data[0].path);
  console.log('data[0].path', data[0].path);
  var insert_data = {};
  insert_data.fileName = data[0].originalname;
  // insert_data.data = new Buffer(path, 'binary').toString('base64');
  // var decodedImage = new Buffer(encodedImage, 'base64').toString('binary');
  insert_data.data = Binary(path);
  var obj = new uploadsSc(insert_data);
  obj.save(callback);
};
module.exports.getFile = function(callback){
  uploadsSc.find({fileName: 'send.png'}, callback);
};
module.exports.getUser = function(email, callback){
  mySchema.findOne({email: email}, callback);
};

module.exports.handleMe = function(message) {
  console.log('message in modal ', message);
  var obj = new chatSc(message);
  chatSc.findOne({ groupId: {$in: message.groupId }}, function(err, data){
    if(!data) {
      obj.save();
    }else {
      chatSc.update(
        {groupId: {$in: message.groupId}},
        {
          $push: {
            text: {
              $each: [ {msg: message.text[0].msg, from: message.text[0].from, name: message.text[0].name, date: message.text[0].date} ],
            }
          }
        }, function(e, d){
          return d;
        });
      }
    });
  };
  module.exports.getMessage = function(condition, callback){
    chatSc.findOne({ groupId: {$in: condition }}, callback);
  };
