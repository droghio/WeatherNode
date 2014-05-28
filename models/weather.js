var mongoose = require('mongoose');

module.exports = {
	weatherschema: mongoose.Schema({
		name: String,
		imageurl: String 
	})
}