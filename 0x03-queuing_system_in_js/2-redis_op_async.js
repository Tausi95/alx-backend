import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

client.on('connect', function() {
  console.log('Redis client connected to the server');
});

client.on('error', function (err) {
  console.log('Redis client not connected to the server: ' + err);
});

// Promisify the get function to use async/await
const getAsync = promisify(client.get).bind(client);

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log(value);
  } catch (err) {
    console.log('Error retrieving value:', err);
  }
}

// Calls
displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');
