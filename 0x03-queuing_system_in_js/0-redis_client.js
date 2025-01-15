// 0-redis_client.js

import redis from 'redis';

// Create a Redis client
const client = redis.createClient({
  host: '127.0.0.1',  // Redis host
  port: 6379          // Redis port
});

// Event listener when the client connects
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event listener when there is an error with the connection
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});
