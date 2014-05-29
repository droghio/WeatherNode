/*
	John Drogo
	May 29, 2014

	WeatherNode Server
	
	This is a nodejs backend script that responds with an image url to be shown
	for the given weather condition.

	(Make sure you put in your API keys below. Three values to update.)
*/


var http = require('http');
var mongoose = require('mongoose');
var express = require("express");
var models = require("./models/weather.js");
var logfmt = require("logfmt");

var app = express();
app.use(logfmt.requestLogger());

var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "API_KEY",
      secret: "API_SECRET"
    };


function newWeather(conditionname, imageurl, Condition){
	//Creates new weather condition in the database. (Disabled.)

	var newweather = new Condition({ name: conditionname, imageurl: imageurl })

	/*
		console.log("Created Document.\n\tNew object: " + newweather.name + " Image: " + imageurl) // 'Silence'
		newweather.save(function (){});
	*/

	console.log("Weather creation disabled.");
	return newweather;
}


function fetchWeather(conditionname, res){
	//Query the database for which image we should use for the provided weather condition.w

	mongoose.connect('mongodb://DB_USERNAME:DB_PASSWORD@oceanic.mongohq.com:10079/developer');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback(){

		console.log("Request: " + conditionname);

		/*
			Weather condition in is url. Optionally we can create a new weather condition that points to the
			provided image url. (Disabled)
		*/

		var imgurl = conditionname.split("/")[3];
		conditionname = conditionname.split("/")[2];

		var Condition = mongoose.model('Weather', models.weatherschema);
		Condition.findOne({ "name" : conditionname }, function(err, wthr){
			if (err) return console.log(err);
			
			if (wthr)
				console.log("Document Found.\n\tName: %s\n\tImage: %s", wthr.name, wthr.imageurl);

			else
				wthr = newWeather(conditionname, imgurl, Condition)

			//Search flickr for a background image based on the current condition. Disabled.
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


/*Serve static content, and query the database when a request is sent to a mydomain.com/node/ url.*/

var port = Number(process.env.PORT);
app.use(express.static(__dirname + "/public"));

app.get('/node/*', function(req, res) { fetchWeather(req.url, res); });
app.listen(port, function() { console.log("Listening on " + port); });