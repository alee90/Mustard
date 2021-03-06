var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var NoteSchema = require('./notes').schema;

var UserSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  notes: [NoteSchema]
});

UserSchema.pre('save', function(next) {
	if(this.isModified('password')) {
		this.password = bcrypt.hashSync(this.password, 10);
	}
	next();
});

UserSchema.methods.authenticate = function(passwordTry) {
	return bcrypt.compareSync(passwordTry, this.password);
};

var User = mongoose.model('User', UserSchema);
module.exports = User;
