var express = require('express');
var router = express.Router();
var passport = require('../config/passport.js');
var User = require('../models/users.js');
var Notes = require('../models/notes.js');
var request = require('request');
// console.log(clientID);

console.log(process.env.JWT_SECRET);


// !!======== NO AUTH ========!!\\

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

// !!======== AUTH ========!!\\

// router.use(passport.authenticate('jwt', { session: false }));


	


module.exports = router;