var express = require('express')
var bodyParser = require('body-parser');
var app = null;
var light = require('../models/light');
var constants = require('../utils/constants')
var path = require('path');
var dataManager = require('../data/datamanager');

var mqttBroker = null

function wrapResponse(output, message) {

    var finalResponse = {
        'result': output,
        'message' : message
    };
    return finalResponse;
}

function startREST(broker){

    mqttBroker = broker;

    app =  express();

    // support json encoded bodies
    app.use(bodyParser.json()); 
    // support encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); 

    //using public folders
    app.use(express.static('public'));

    //starting the rest server
    app.listen(3000, function () {
        console.log('Nitlite is listening on port 3000...')
    })

    //default page
    app.get('/', function(req, res){
        res.sendFile(path.resolve("index.html"));
    });

    //get all lights
    app.get('/light/all', function(req, res){

        try {

            dataManager.getAllLights(function(error, lights){
                if (error){
                    console.log('error while fetching lights', error);
                    res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                }
                else {
                    console.log('successfully fetched lights');
                    res.send(wrapResponse(lights, constants.SERVER_MESSAGE.SUCCESS_RESPONSE_MESSAGE));
                }
            });

        }
        catch(error){
            console.log('error while fetching lights', error);
            res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
        }
    });

    //add light
    app.post('/light/add', function(req, res){
            
        try {
            
            var lightInfo = new light(req.body);
            lightInfo.save(function(error){
                if (error) {
                    console.log('error while adding light', error);
                    res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                }
                else {
                    res.send(wrapResponse(lightInfo, constants.SERVER_MESSAGE.SUCCESS_RESPONSE_MESSAGE));
                }
            });
        }
        catch(error){
            console.log('error while adding light', error);
            res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
        }
    });

    //update light info
    app.put('/light/:id', function(req, res){
        try {
            
            var lightInfo = new light(req.body);
            dataManager.getLightByDeviceId(req.params.id, function(error, light){
                if (error) {
                    console.error('error occured while editing light', error);
                    res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                }
                else {
                    light.name = lightInfo.name;
                    light.id = lightInfo.id;
                    light.location = lightInfo.location;
                    light.state = lightInfo.state;
                    light.save(function(error){
                        if (error) {
                            console.error('error occured while editing light', error);
                            res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                        }
                        else {
                            console.log('successfully updated the light')
                            res.send(wrapResponse(light,constants.SERVER_MESSAGE.SUCCESS_RESPONSE_MESSAGE));
                        }
                    });
                }
            });

        }
        catch(error) {
            console.log('error while updating light info', error);
            res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
        }
    });

    //update light state
    app.put('/light/:id/:state', function(req, res){
        try {
            
            dataManager.getLightByDeviceId(req.params.id, function(error, light){
                if (error) {
                    console.error('error occured while updating light state', error);
                    res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                }
                else {
                    light.state = req.params.state;
                    device_id = light.device_id;
                    light.save(function(error){
                        if (error) {
                            console.error('error occured while updating light state', error);
                            res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                        }
                        else {
                            console.log('successfully updated the light')
                            res.send(wrapResponse(light,constants.SERVER_MESSAGE.SUCCESS_RESPONSE_MESSAGE));
                            mqttBroker.emitter.emit(constants.CLIENT_RESPONSE_TOPIC.UPDATE_LIGHT_STATE_RESP, [device_id]);
                        }
                    });
                }
            });

        }
        catch(error) {
            console.error('error occured while updating light state', error);
            res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
        }
    });

    //delete light
    app.delete('/light/:id', function(req, res){
        try {

            dataManager.removeLightByDeviceId(req.params.id, function(error){
                if (error){
                    console.log('error while deleting the light', error);
                    res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                }
                else {
                    console.log('successfully deleted the light')
                    res.send(wrapResponse(req.params.id,constants.SERVER_MESSAGE.SUCCESS_RESPONSE_MESSA));
                }
            });
        }
        catch(error){
            console.log('error occured while deleting the light', error);
            res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
        }
    });
}

//exporting the rest server apis
module.exports.startREST = startREST;