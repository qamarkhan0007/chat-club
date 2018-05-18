var express = require('express');
var router = express.Router();
var controller = require('./controller.js');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/uploadMe', controller.upload);
router.get('/file', controller.getFile);
router.post('/getmsg', controller.getMessage);
router.get('/:email', controller.getUser);

module.exports = router;
