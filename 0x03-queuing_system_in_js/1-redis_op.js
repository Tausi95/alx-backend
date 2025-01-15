import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Handle Redis client connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Handle Redis client error
client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err);
});

// Function to set a new school in Redis
const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, redis.print); // Sets the value for the schoolName key
};

// Function to display the value of a school from Redis
const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.log('Error fetching value:', err);
    } else {
      console.log(reply); // Logs the value for the schoolName
    }
  });
};

// Call the functions as per the task
displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');
