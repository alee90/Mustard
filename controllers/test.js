var express = require('express');
var router = express.Router();
var request = require('request');


var openWeatherId = process.env.OPEN_WEATHER_ID;


router.get('/weather/', function(req, res){
    console.log(req.params.zip);
    request("http://api.openweathermap.org/data/2.5/weather?zip=91364" + ",us&APPID=" + openWeatherId, function (error, response, body) {
        var data = JSON.parse(body)
        res.send(data);
    })
})



module.exports = router;