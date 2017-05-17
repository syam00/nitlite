var mosca = require('mosca');
var light = require('../models/light');
var constants = require('../utils/constants')
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/nitlite');

var pubsubsettings = {
  //using ascoltatori
  type: 'mongo',		
  url: 'mongodb://localhost:27017/nitliteMqttStore',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var settings = {
  port: 1883,
  backend: pubsubsettings
};

var server = null;

//starting the mqtt broker service
function startMQTT() {
  server = new mosca.Server(settings);

  server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
  });

  // fired when a message is received
  server.on('published', function(packet, client) {

    try {

      console.log('received a message under the topic ' + packet.topic);
      //resolving the topic and based on that execute corresponding tasks 
      switch(packet.topic) {
          case constants.CLIENT_REQUEST_TOPIC.ADD_LIGHT_REQ:
                console.log('Published add_light', packet.payload.toString());
                addLight(packet.payload, function(error){
                  if (error) {
                      console.log('error');
                      sendResponse(client.id, constants.CLIENT_RESPONSE_TOPIC.ADD_LIGHT_RESP, constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                  } 
                  else {
                      console.log('successfully saved light')
                      sendResponse(client.id, constants.CLIENT_RESPONSE_TOPIC.ADD_LIGHT_RESP, constants.SERVER_MESSAGE.SUCCESS_RESPONSE_MESSAGE);
                  }
                });
          break;
        case constants.CLIENT_REQUEST_TOPIC.EDIT_LIGHT_REQ:
                console.log('Published edit_light', packet.payload.toString());
                editLight(packet.payload, function(error) {
                  if (error) {
                      console.log('error');
                      sendResponse(client.id, constants.CLIENT_RESPONSE_TOPIC.EDIT_LIGHT_RESP, constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                  } 
                  else {
                      console.log('successfully saved light')
                      sendResponse(client.id, constants.CLIENT_RESPONSE_TOPIC.EDIT_LIGHT_RESP, constants.SERVER_MESSAGE.SUCCESS_RESPONSE_MESSAGE);
                  }
                });
          break;
        case constants.CLIENT_REQUEST_TOPIC.DELETE_LIGHT_REQ:
                deleteLight(packet.payload, function(error) {
                  if (error) {
                      console.log('error deleting light');
                      sendResponse(client.id, constants.CLIENT_RESPONSE_TOPIC.DELETE_LIGHT_RESP, constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                  } 
                  else {
                      console.log('successfully deleted light')
                      sendResponse(client.id, constants.CLIENT_RESPONSE_TOPIC.DELETE_LIGHT_RESP, constants.SERVER_MESSAGE.SUCCESS_RESPONSE_MESSAGE);
                  }
                });
          break;
        case constants.CLIENT_REQUEST_TOPIC.GET_LIGHT_STATE_REQ:
              getLightStatus(packet.payload, function(error, light){
                if (error) {
                  console.log('error while getting status of the light');
                  sendResponse(client.id, constants.CLIENT_RESPONSE_TOPIC.GET_LIGHT_STATE_RESP, constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                }
                else {
                  console.log('succesfully fetched the status of the light'); 
                  sendResponse(client.id, constants.CLIENT_RESPONSE_TOPIC.GET_LIGHT_STATE_RESP, constants.SERVER_MESSAGE.SUCCESS_RESPONSE_MESSAGE);                                  
                }
              });
          break;
        case constants.CLIENT_REQUEST_TOPIC.GET_ALL_LIGHTS_REQ:
              getAllLights(packet.payload, function(error, lights){
                if (error) {
                  console.log('error while getting status of the light');
                  sendResponse(client.id, constants.CLIENT_RESPONSE_TOPIC.GET_ALL_LIGHTS_RESP, constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                }
                else {
                  console.log('succesfully fetched the status of the light'); 
                  sendResponse(client.id, constants.CLIENT_RESPONSE_TOPIC.GET_ALL_LIGHTS_RESP, constants.SERVER_MESSAGE.SUCCESS_RESPONSE_MESSAGE);                                  
                }
              });
          break;
      }
      
    } catch (error) {
        console.error('error occured while receiving message', error)
    }

  });

  // fired when a message is received
  server.on('subscribed', function(packet, client) {
    console.log('Published', packet.payload);
  });

  // fired when a client disconnects
  server.on('clientDisconnected', function(client) {
    console.log('Client Disconnected:', client.id);
  });

  server.on('ready', setup);
}

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}


function sendResponse(clientId,action,status) {

  var message = {
    topic: action,
    payload: status, // or a Buffer
    qos: 0, // 0, 1, or 2
    retain: false // or true
  };

  server.publish(message, function(){
    console.log("send the response to client");
  });
}


function addLight(payload, callback) {
  try {
        lightInfo = new light(JSON.parse(payload));
        lightInfo.save(callback);

  } catch (error) {
    console.error('error occured while adding light', error);
  }
}

function editLight(payload, callback) {
  var lightInfo = null;
  try {
    
      lightInfo = new light(JSON.parse(payload));
      light.findById(lightInfo.id, function(error, light){
        
        if (error) {
          console.error('error occured while editing light', error);
          callback(error);
        }
        else {
          light.name = lightInfo.name;
          light.id = lightInfo.id;
          light.location = lightInfo.location;
          light.state = lightInfo.state;
          light.save(callback);
        }
      });

  } catch (error) {
      console.error('error occured while editing light', error);
  }
}

function deleteLight(payload, callback) {
  var lightInfo = null;
  try {
    
      lightInfo = new light(JSON.parse(payload));
      light.findByIdAndRemove(lightInfo.id, function(error, light){
        callback(error);
      });

  } catch (error) {
      console.error('error occured while deleting light', error);
  }
}

function getLightStatus(payload, callback) {
  var lightInfo = null;
  try {

    var input = JSON.parse(payload);
    console.log(input);
    light.findById(input['id'], function(error, response){
      console.log(response);
      callback(error, response);
    });

  } catch (error) {
    console.error('error occured while getting light info', error);
  }
}

function getAllLights(payload, callback) {
  try {

    light.find(function(error, lights){
      console.log(lights);
      callback(error, lights);
    });
  } catch(error) {
    console.error('error occured while getting all light info', error);
  }
}

module.exports.startMQTT = startMQTT;