import express from 'express';
import redis from 'redis';
import kue from 'kue';
import { promisify } from 'util';

// Redis client setup
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Kue queue setup
const queue = kue.createQueue();

// Initialize seats and reservationEnabled
let reservationEnabled = true;
const availableSeats = 50;
await setAsync('available_seats', availableSeats);

// Express app setup
const app = express();
const port = 1245;

// Helper functions
async function reserveSeat(number) {
    await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
    return parseInt(await getAsync('available_seats'), 10);
}

// Routes
app.get('/available_seats', async (req, res) => {
    const availableSeats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats: availableSeats });
});

app.get('/reserve_seat', async (req, res) => {
    if (!reservationEnabled) {
        return res.json({ status: "Reservation are blocked" });
    }

    const job = queue.create('reserve_seat', {}).save((err) => {
        if (err) {
            return res.json({ status: "Reservation failed" });
        }
        res.json({ status: "Reservation in process" });
    });
});

app.get('/process', async (req, res) => {
    res.json({ status: "Queue processing" });

    queue.process('reserve_seat', async (job, done) => {
        try {
            let availableSeats = await getCurrentAvailableSeats();
            if (availableSeats > 0) {
                availableSeats -= 1;
                await reserveSeat(availableSeats);
                if (availableSeats === 0) {
                    reservationEnabled = false;
                }
                done();
            } else {
                throw new Error('Not enough seats available');
            }
        } catch (err) {
            done(err);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
