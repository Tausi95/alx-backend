import kue from 'kue';

function createPushNotificationsJobs(jobs, queue) {
  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Loop through each job and add it to the queue
  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData)
      .save((err) => {
        if (err) {
          console.log(`Notification job failed: ${err}`);
        } else {
          console.log(`Notification job created: ${job.id}`);
        }
      });

    // Handle job progress
    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });

    // Handle job completion
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    // Handle job failure
    job.on('failed', (err) => {
      console.log(`Notification job ${job.id} failed: ${err}`);
    });
  });
}

export default createPushNotificationsJobs;
