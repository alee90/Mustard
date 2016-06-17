var express = require('express');
var router = express.Router();
var passport = require('../config/passport.js');
var User = require('../models/users.js');
var Notes = require('../models/notes.js');
var clientID = 'Client-ID ' + process.env.IMGUR_CLIENT_ID;
var request = require('request');
console.log(clientID);



//!!======== NO AUTH ========!!\\

// CREATE A NEW USER
router.post('/', function(req, res) {
	User.create(req.body, function(err, user) {
		if(err) {
			console.log(err); 
			res.status(500).end();
		}
		res.send(true);
	});
});

//!!======== AUTH ========!!\\

// router.use(passport.authenticate('jwt', { session: false }));

router.get('/forks', function(req, res){
	var options = {
		'url': "https://api.imgur.com/3/gallery/search/?q_exactly=forks",
	  headers: {
    	'Authorization': clientID 
  	}
	};
	
	request(options, function (error, response, body) {
		//What happens with the response?
		if(!error && response.statusCode == 200){
			console.log('hat');
			var bodied = JSON.parse(body);
			// console.log(bodied);
			res.send(bodied);
		}
	})
});

module.exports = router;