var express = require('express');
var router = express.Router();
var request = require('request');
var clientID = 'Client-ID ' + process.env.IMGUR_CLIENT_ID

console.log('hello')

var nytkey = process.env.NYT_KEY;

router.get('/', function(req, res){
    var options = {
        "url": "https://api.nytimes.com/svc/topstories/v2/home.json",
        qs: {
            "api-key": process.env.NYT_KEY}
     };
	request(options, function (error, response, body) {
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.send(data);
		}

	})

});
var openWeatherId = process.env.OPEN_WEATHER_ID;
console.log('hello')
var nytkey = process.env.NYT_KEY;

router.get('/pics/forks', function(req, res){
	var options = {
		'url': "https://api.imgur.com/3/gallery/search/?q_exactly=forks",
	  headers: {
    	'Authorization': clientID
  	}
	};
	request(options, function (error, response, body) {
		if(!error && response.statusCode == 200){
			console.log('hat');
			var bodied = JSON.parse(body);
			res.send(bodied);
		}
	})
});


var openWeatherId = process.env.OPEN_WEATHER_ID;

router.get('/weather/', function(req, res){
    console.log(req.params.zip);
    request("http://api.openweathermap.org/data/2.5/weather?zip=10013,us&APPID=" + openWeatherId, function (error, response, body) {
        var data = JSON.parse(body)
        res.send(data);
    })
})


router.get('/pics/forks', function(req, res){
	var options = {
		'url': "https://api.imgur.com/3/gallery/search/?q_exactly=forks",
	  headers: {
    	'Authorization': clientID
  	}
	};
	request(options, function (error, response, body) {
		if(!error && response.statusCode == 200){
			console.log('hat');
			var bodied = JSON.parse(body);
			res.send(bodied);
		}
	})
});


module.exports = router;