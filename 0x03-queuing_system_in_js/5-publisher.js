const redis = require('redis');
const publisher = redis.createClient();

publisher.on('connect', function() {
  console.log('Redis client connected to the server');
});

publisher.on('error', function(err) {
  console.log('Redis client not connected to the server: ' + err);
});

function publishMessage(message, time) {
  setTimeout(() => {
    console.log('About to send ' + message);
    publisher.publish('ALXchannel', message);
  }, time);
}

publishMessage('ALX Student #1 starts course', 100);
publishMessage('ALX Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('ALX Student #3 starts course', 400);
