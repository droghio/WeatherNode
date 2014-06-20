WeatherNode
===========

Simple Weather Application using Node, Mongo, Mongoose and AngularJS

###PREREQUISITES

You must have nodejs installed and access to a mongodb.
I use MongoHQ but any mongo database should work.




###SETUP

After you have installed node run:
  ```npm install```
  
This will load all of the project dependencies.
To set up the web ui and mongo bindings you'll need to set a few environment variables.

For mongodb:
  
      export MONGO_USER="your_mongo_username"
      export MONGO_PASSWORD="your_mongo_password"
      export MONGO_URL="your_mongo_URL/the_database" #(Do not include mongodb://.)
  

Then for express:
  ```export PORT=8000```
  
  Where you replace the 8000 with whatever port you want the webui to be forwarded to.
  
  
  
  
###RUNNING

Move to the CrawlingSpecter install directory and run:
  ```node index.js```


###DETAILS

You need a mongodb to specify which url to use for the given weather condition.
Database query comes from the weather.main parameter from a json request to OpenWeatherMap.

View their api documentation for more information:
    http://openweathermap.org/weather-conditions

I've included a backup of the mongodb I used for this project. You can clone it to a local mongodb instance by navigating to the WeatherNode files and running:
  ```mongorestore --host 127.0.0.1 ./dump/```

or for a remote server running:
  ```mongorestore -h MONGO_DB_ADDRESS:PORT -d MONGODATABASE -u USERNAME -p PASSWORD ./dump

See <a href="http://support.mongohq.com/importing-exporting/local-to-mongohq.html">http://support.mongohq.com/importing-exporting/local-to-mongohq.html</a> for more information.