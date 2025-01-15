const kue = require('kue');
const queue = kue.createQueue();

// Array of blacklisted phone numbers
const blacklistedNumbers = [
  '4153518780',
  '4153518781'
];

// Function to send notification
function sendNotification(phoneNumber, message, job, done) {
  // Start job progress at 0
  job.progress(0, 100);

  // Check if phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    // Mark job as failed with an error
    console.log(`Phone number ${phoneNumber} is blacklisted`);
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`)); // End job with failure
  }

  // Track progress to 50%
  job.progress(50, 100);

  // Log the sending notification
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Simulate some processing delay and complete job
  setTimeout(() => {
    job.progress(100, 100);  // Complete the job
    console.log(`Notification job #${job.id} completed`);
    done();  // Signal the job completion
  }, 1000);  // Simulate a 1-second delay for sending the notification
}

// Queue to process jobs
queue.process('push_notification_code_2', 2, (job, done) => {
  try {
    sendNotification(job.data.phoneNumber, job.data.message, job, done);
  } catch (err) {
    done(err); // Catch and pass any errors
  }
});
