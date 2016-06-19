var express = require('express');
var router = express.Router();
var request = require('request');
var clientID = 'Client-ID ' + '09e814568592ee0'


var openWeatherId = process.env.OPEN_WEATHER_ID;
console.log('hello')
var nytkey = process.env.NYT_KEY;


router.get('/weather/', function(req, res){
    console.log(req.params.zip);
    request("http://api.openweathermap.org/data/2.5/weather?zip=91364" + ",us&APPID=" + 'c4221a89b8debf219f74003baa7902f3', function (error, response, body) {
        var data = JSON.parse(body)
        res.send(data);
    })
})

router.get('/', function(req, res){
    var options = {
        "url": "https://api.nytimes.com/svc/topstories/v2/home.json",
        qs: {
            "api-key":'10f0d8b7d6024185bff1c40cca7b2197'}
     };
	request(options, function (error, response, body) {
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.send(data);
		}

	})

});

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