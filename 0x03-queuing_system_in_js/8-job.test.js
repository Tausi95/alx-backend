import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';
import { expect } from 'chai';

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    queue = kue.createQueue();
    queue.testMode = true;
  });

  afterEach(() => {
    queue.testMode = false;
    queue.shutdown(500, () => console.log('Queue cleared'));
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
  });

  it('should create two new jobs to the queue', (done) => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 5678 to verify your account' },
    ];

    createPushNotificationsJobs(jobs, queue);

    // Wait a bit for jobs to be created
    setTimeout(() => {
      expect(queue.testMode.jobs.length).to.equal(2);
      done();
    }, 500); // Adjust timeout if needed
  });

  it('should have job with correct properties', () => {
    const jobs = queue.testMode.jobs;
    const job = jobs[0];

    expect(jobs.length).to.be.greaterThan(0);
    expect(job.data.phoneNumber).to.equal('4153518780');
    expect(job.data.message).to.equal('This is the code 1234 to verify your account');
  });

  it('should not process jobs in test mode', (done) => {
    createPushNotificationsJobs([{ phoneNumber: '4153518780', message: 'Test' }], queue);

    setTimeout(() => {
      const jobs = queue.testMode.jobs;
      expect(jobs.length).to.be.greaterThan(0);
      done();
    }, 100);
  });
});
