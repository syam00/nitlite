var express = require('express')
var app = null;


function startREST(){
    app =  express();
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    })

    //get all lights
    app.get('/light/all', function(req, res){

        try {
            res.send('all lights')
        }
        catch(error){

        }
    });

    //add light
    app.post('/light/add', function(req, res){

    });

    //edit light
    app.put('/light', function(req, res){

    });

    //delete light
    app.delete('/light', function(req, res){

    });

    
}

module.exports.startREST = startREST;