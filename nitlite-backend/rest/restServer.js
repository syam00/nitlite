var express = require('express')
var bodyParser = require('body-parser');
var app = null;
var light = require('../models/light');
var constants = require('../utils/constants')


function startREST(){
    app =  express();

    // support json encoded bodies
    app.use(bodyParser.json()); 
    // support encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); 

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    })



    //get all lights
    app.get('/light/all', function(req, res){

        try {
            light.find(function(error, lights){
                console.log(lights);
                if (error){
                    res.send(constants.SERVER_MESSAGE.ERROR_RESPONSE_MESSAGE);
                }
                else {
                    res.send(lights);
                }
            });
        }
        catch(error){
            console.log('error while fetching lights', error);
        }
    });

    //add light
    app.post('/light/add', function(req, res){
            var user_id = req.body.id;
            res.send(user_id);
    });

    //edit light
    app.put('/light', function(req, res){

    });

    //delete light
    app.delete('/light', function(req, res){

    });


}

module.exports.startREST = startREST;