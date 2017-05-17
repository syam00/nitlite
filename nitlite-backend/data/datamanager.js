var mongoose = require('mongoose');
var user = require('../models/user')
var light = require('../models/light')
var constants = require('../utils/constants')

function connectDB() {
  try {

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/nitlite');
  }
  catch(error) {
    confirm.log('error while connecting to mongo', error);
  }
}

module.exports.connectDB = connectDB;