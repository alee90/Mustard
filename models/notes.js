var mongoose = require('mongoose');

var NoteSchema = mongoose.Schema({
	notes: String
});

var Notes = mongoose.model('Notes', NoteSchema);

module.exports = Notes;