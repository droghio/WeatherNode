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
