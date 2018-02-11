var mosca = require('mosca');
var light = require('../models/light');
var dataManager = require('../data/datamanager');
var constants = require('../utils/constants')
const EventEmitter = require('events');
const emitter = new EventEmitter();

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
          case constants.CLIENT_REQUEST_TOPIC.INITIALIZE_LIGHT_REQ: 
              updateLight(packet.payload, function(error, light){
                if (error) {
                  console.log('error while getting status of the light');
                  sendResponse(constants.CLIENT_RESPONSE_TOPIC.GET_LIGHT_INFO_RESP, constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                }
                else {
                  console.log('succesfully fetched the status of the light'); 
                  sendResponse( constants.CLIENT_RESPONSE_TOPIC.GET_LIGHT_INFO_RESP, light.state.toString());                                  
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


function sendResponse(action,status) {

  console.log("sending response " + action);

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

function updateLight(light_device_id, callback) {
  try {

      dataManager.getLightByDeviceId(light_device_id, function(error, light){

        if (error) {
          console.error('error occured while editing light', error);
          callback(error);
        }
        else {
          light.active = 1;
          light.save(function(error){
            callback(error, light);
          });
        }
      });

  } catch (error) {
      console.error('error occured while editing light', error);
  }
}

emitter.on(constants.CLIENT_RESPONSE_TOPIC.UPDATE_LIGHT_STATE_RESP, function (light_device_id,err) {
    console.error(err);

    dataManager.getLightByDeviceId(light_device_id, function(error, light) {

        if(error == null && light != null) {
            console.log('succesfully fetched the status of the light ' + light); 
            if (light.active == 1) {
              sendResponse( constants.CLIENT_RESPONSE_TOPIC.UPDATE_LIGHT_STATE_RESP, light.state.toString());                                  
            }
            else {
              console.log('light not initialized'); 
            }
        }
        else {
           console.log('error while getting status of the light');
          sendResponse(constants.CLIENT_RESPONSE_TOPIC.UPDATE_LIGHT_STATE_RESP, constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
        }

    });
});

module.exports.startMQTT = startMQTT;
module.exports.emitter = emitter;
