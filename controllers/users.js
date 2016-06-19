var express = require('express');
var router = express.Router();
var passport = require('../config/passport.js');
var User = require('../models/users.js');
var Notes = require('../models/notes.js');
var request = require('request');
// console.log(clientID);


// !!======== NO AUTH ========!!\\

// CREATE A NEW USER
router.post('/', function(req,res) {
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

//GET NOTE
router.get('/:id/notes', function(req,res){
	console.log('!!==== NOTE GET REQUEST ====!!')
	User.findById(req.params.id).then(function(user) {
		res.json(user);
	});
})

//NEW NOTE
router.post('/:id/notes', function(req,res){
	console.log('!!==== NEW NOTE ====!!')
	User.findById(req.params.id).then(function(user){
		var note = new Notes(req.body) 
		note.save();
		user.notes.push(note);
		user.save();
		console.log(user);
		res.send(user);
	});
});

//UPDATE NOTES
router.put('/:id/notes/:note_id', function(req,res) {
	console.log('!!===== UPDATE NOTE =====!!');
	User.findById(req.params.id).then(function(user) { 
		console.log(user);
		Notes.findOneAndUpdate({_id: req.params.note_id }, req.body, function(err, note) { 
			if (err) {
				console.log(err);
			}
			console.log(note);
			note.save();
		})
		user.notes.forEach( function(noted) {
			if (noted._id == req.params.note_id) {  
				console.log(noted);
				noted.name = req.body.name;
				user.save();
			}
		})
		console.log(user.notes);
	})
});

//DELETE NOTES
router.delete('/:id/notes/:note_id', function(req,res){
	console.log('!!===== DELETE NOTE =====!!');
	User.findById(req.params.id).then(function(user){ 
		user.notes.forEach(function(note){
			if(note._id == req.params.note_id){ 
				console.log(note);
				var index = user.notes.indexOf(note); 
				console.log(index);
				user.notes.splice(index, 1); 
				user.save();
			}
		});
	});
	Notes.findOneAndRemove({_id: req.params.notes_id}).then(function() { 
		console.log('!!===== NOTE DELETED!! =====!!')
	});
});

module.exports = router;