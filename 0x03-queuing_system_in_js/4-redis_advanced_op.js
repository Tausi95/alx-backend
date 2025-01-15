import redis from 'redis';

const client = redis.createClient();

client.on('connect', function() {
  console.log('Redis client connected to the server');
});

client.on('error', function (err) {
  console.log('Redis client not connected to the server: ' + err);
});

// Delete the existing key if it exists
function deleteExistingKey() {
  client.del('ALX', (err, response) => {
    if (err) {
      console.log('Error deleting key:', err);
    } else {
      console.log(`Deleted key ALX: ${response}`);
    }
  });
}

// Create a hash with multiple key-value pairs
function createHash() {
  client.hset('ALX', 'Portland', 50, redis.print);
  client.hset('ALX', 'Seattle', 80, redis.print);
  client.hset('ALX', 'New York', 20, redis.print);
  client.hset('ALX', 'Bogota', 20, redis.print);
  client.hset('ALX', 'Cali', 40, redis.print);
  client.hset('ALX', 'Paris', 2, redis.print);
}

// Display the hash stored in Redis
function displayHash() {
  client.hgetall('ALX', function(err, object) {
    if (err) {
      console.log('Error retrieving hash:', err);
    } else {
      console.log(object);
    }
  });
}

// Calls
deleteExistingKey();
createHash();
displayHash();
