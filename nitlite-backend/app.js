var mqttBroker = require('./mqtt/mqttServer')
var restHandler = require('./rest/restServer')

//start mqtt server
mqttBroker.startMQTT();

//start the rest server
restHandler.startREST();


