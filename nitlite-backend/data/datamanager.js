var mongoose = require('mongoose');
var user = require('../models/user')
var light = require('../models/light')
var constants = require('../utils/constants')

function connectDB(url) {
  try {

    mongoose.Promise = global.Promise;
    mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology : true})
  }
  catch(error) {
    confirm.log('error while connecting to mongo', error);
  }
}

//function to get all lights
function getAllLights(callback){

  try {

      light.find(function(error, lights){
          callback(error, lights);
      })
  }
  catch(error) {
    console.log('error while getting all lights');
  }
}

//function to get light by device id
function getLightByDeviceId(deviceId, callback) {

  try {
    light.find({'device_id' : deviceId}, function(error, lights){
      console.log('getLightByDeviceId =>' + lights);
      if (lights != null && lights.length >= 0) {
        var selectedLight = lights[0];
        callback(error, selectedLight);
        console.log('light found');
      }
      else {
        callback(error, lights);
        console.log('light not found');
      }

    });
  }
  catch(error) {
    console.log('error while getting light by device id');
  }
}

function removeLightByDeviceId(deviceId, callback) {

  try {
      light.findOneAndRemove({'device_id' : deviceId}, function(error){
        callback(error);
      });
  }
  catch(error) {
      console.log('error while removing light by device id');
  }
}

module.exports.connectDB = connectDB;
module.exports.getAllLights = getAllLights;
module.exports.getLightByDeviceId = getLightByDeviceId;
module.exports.removeLightByDeviceId = removeLightByDeviceId;