const kue = require('kue');
const queue = kue.createQueue();

// Create an object with the job data
const jobData = {
  phoneNumber: '123456789',
  message: 'Hello, your notification is ready!'
};

// Create a job
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (err) {
      console.log('Notification job failed: ' + err);
    } else {
      console.log('Notification job created: ' + job.id);
    }
  });

// Handle job completion
job.on('complete', () => {
  console.log('Notification job completed');
});

// Handle job failure
job.on('failed', (err) => {
  console.log('Notification job failed: ' + err);
});

