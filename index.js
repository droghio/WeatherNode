var http = require('http');
var mongoose = require('mongoose');
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

var models = require("./models/weather.js");

var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "45156932c38533d0608b7d487e8b1d16",
      secret: "e137cad75d9a15c8"
    };

function newWeather(conditionname, imageurl, Condition){

	var newweather = new Condition({ name: conditionname, imageurl: imageurl })
	/*console.log("Created Document.\n\tNew object: " + newweather.name + " Image: " + imageurl) // 'Silence'
	newweather.save(function (){});*/
	return newweather;
	console.log("Weather creation disabled.");
}


function fetchWeather(conditionname, res){
	mongoose.connect('mongodb://john:eggplants8@oceanic.mongohq.com:10079/developer');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback(){

		console.log("Request: " + conditionname);

		var imgurl = conditionname.split("/")[3];
		conditionname = conditionname.split("/")[2];

		var Condition = mongoose.model('Weather', models.weatherschema);
		Condition.findOne({ "name" : conditionname }, function(err, wthr){
			if (err) return console.log(err);
			
			if (wthr)
				console.log("Document Found.\n\tName: %s\n\tImage: %s", wthr.name, wthr.imageurl);

			else
				wthr = newWeather(conditionname, imgurl, Condition)
	

		/*Flickr.tokenOnly(flickrOptions, function(error, flickr) {
			// we can now use "flickr" as our API object
			flickr.photos.search({
				text: conditionname,
				safe_search: 1,
				page: 1,
				per_page: 1
			}, function(err, result) {
				// result is Flickr's response
				result = result["photos"]["photo"][0]
				console.log(result)
				console.log("http://farm%s.staticflickr.com/%s/%s_%s.jpg", result["farm"], result["server"], result["id"], result["secret"]);
				res.send("http://farm" + result["farm"] + ".staticflickr.com/" + result["server"] + "/" + result["id"] + "_" + result["secret"] + ".jpg")
			});
		});*/

			res.send(wthr.imageurl);
			console.log("End Request\n");
			mongoose.connection.close();
		});
	});
}


var port = Number(process.env.PORT);

app.use(express.static(__dirname + "/public"));

app.get('/node/*', function(req, res) {
   fetchWeather(req.url, res);
});

app.listen(port, function() {
  console.log("Listening on " + port);
});