var mongoose = require('mongoose')
var randomUUID = require('uuid/v4')

var Schema = mongoose.Schema;

// create a schema
var lightSchema = new Schema({
  name: String,
  device_id: { type: String, required: true, unique: true },
  id: String,
  location: String,
  state: Number,
  created_at: Date,
  updated_at: Date
});


// on every save, add the date
lightSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  //if the id doesn't exist, add to that field
  if (!this.id)
    this.id = randomUUID();

  next();
});

// the schema is useless so far
// we need to create a model using it
var Light = mongoose.model('Light', lightSchema);

// make this available to our users in our Node applications
module.exports = Light;