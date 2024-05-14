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

