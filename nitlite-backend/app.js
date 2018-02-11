var dataManager = require('./data/datamanager')
var mqttBroker = require('./mqtt/mqttServer')
var restHandler = require('./rest/restServer')

//connect to db
dataManager.connectDB('mongodb://localhost:27017/nitlite');

//start mqtt server
mqttBroker.startMQTT();

//start the rest server
restHandler.startREST(mqttBroker);


