var mongoose = require('mongoose');
var user = require('../models/user')
var light = require('../models/light')
var constants = require('../utils/constants')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/nitlite');

var myRoomLight = new light({
  name : 'myRoomLight',
  device_id : constants.LIGHT_DEVICE_ID,
  location : 'shunfu road',
  state : 0
})

myRoomLight.save(function(err){
  if (err) {
    console.log('error');
  }
  else {
    console.log('successfully saved light')
  }
});