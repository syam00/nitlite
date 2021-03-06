var define = require('node-constants')(exports);

define('LIGHT_DEVICE_ID', 'XXX9900999');

var CLIENT_REQUEST_TOPIC = {
    ADD_LIGHT_REQ : 'ADD_LIGHT_REQ',
    EDIT_LIGHT_REQ : 'EDIT_LIGHT_REQ',
    DELETE_LIGHT_REQ : 'DELETE_LIGHT_REQ',
    UPDATE_LIGHT_STATE_REQ : 'UPDATE_LIGHT_STATE_REQ',
    GET_LIGHT_STATE_REQ : 'GET_LIGHT_INFO_REQ',
    GET_ALL_LIGHTS_REQ : 'GET_ALL_LIGHTS_REQ',
    INITIALIZE_LIGHT_REQ : 'INITIALIZE_LIGHT_REQ'   
};

var CLIENT_RESPONSE_TOPIC = {
    ADD_LIGHT_RESP : 'ADD_LIGHT_RESP',
    EDIT_LIGHT_RESP : 'EDIT_LIGHT_RESP',
    DELETE_LIGHT_RESP : 'DELETE_LIGHT_RESP',
    UPDATE_LIGHT_STATE_RESP : 'UPDATE_LIGHT_STATE_RESP',
    GET_LIGHT_STATE_RESP : 'GET_LIGHT_STATE_RESP',
    GET_ALL_LIGHTS_RESP : 'GET_ALL_LIGHTS_RESP',
    GET_LIGHT_INFO_RESP : 'GET_LIGHT_INFO_RESP' 
};

var SERVER_MESSAGE = {
    SUCCESS_RESPONSE_MESSAGE : 'SUCCESS',
    ERROR_RESPONSE_MESSAGE : 'ERROR' 
};

module.exports.CLIENT_REQUEST_TOPIC = CLIENT_REQUEST_TOPIC;
module.exports.CLIENT_RESPONSE_TOPIC = CLIENT_RESPONSE_TOPIC;
module.exports.SERVER_MESSAGE = SERVER_MESSAGE;
