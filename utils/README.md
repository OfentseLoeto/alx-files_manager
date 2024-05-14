0-Inside the folder utils, create a file redis.js that contains the class RedisClient.

RedisClient should have:

the constructor that creates a client to Redis:
.any error of the redis client must be displayed in the console (you should use on('error') of the redis client)
.a function isAlive that returns true when the connection to Redis is a success otherwise, false
.an asynchronous function get that takes a string key as argument and returns the Redis value stored for this key
.an asynchronous function set that takes a string key, a value and a duration in second as arguments to store it in Redis (with an expiration set by the duration argument)
.an asynchronous function del that takes a string key as argument and remove the value in Redis for this key

After the class definition, create and export an instance of RedisClient called redisClient.

1-Inside the folder utils, create a file db.js that contains the class DBClient.

DBClient should have:

the constructor that creates a client to MongoDB:
.host: from the environment variable DB_HOST or default: localhost
.port: from the environment variable DB_PORT or default: 27017
.database: from the environment variable DB_DATABASE or default: files_manager
.a function isAlive that returns true when the connection to MongoDB is a success otherwise, false
.an asynchronous function nbUsers that returns the number of documents in the collection users
.an asynchronous function nbFiles that returns the number of documents in the collection files
.After the class definition, create and export an instance of DBClient called dbClient.

2-Inside server.js, create the Express server:

.it should listen on the port set by the environment variable PORT or by default 5000
.it should load all routes from the file routes/index.js

Inside the folder routes, create a file index.js that contains all endpoints of our API:

.GET /status => AppController.getStatus
.GET /stats => AppController.getStats
Inside the folder controllers, create a file AppController.js that contains the definition of the 2 endpoints:

.GET /status should return if Redis is alive and if the DB is alive too by using the 2 utils created previously: { "redis": true, "db": true } with a status code 200

.GET /stats should return the number of users and files in DB: { "users": 12, "files": 1231 } with a status code 200
-users collection must be used for counting all users
-files collection must be used for counting all files

