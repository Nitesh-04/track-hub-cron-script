import cron from 'node-cron';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://track-hub.vercel.app/api';
const CRON_SECRET = process.env.CRON_SECRET;

if(!CRON_SECRET) {
  throw new Error('CRON_SECRET is required');
}

async function hourlyNotification() {
    try {
        const response = await fetch(`${BASE_URL}/notifyHourly`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${CRON_SECRET}`,
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok) {
            throw new Error('Failed to send hourly notification');
        }

        console.log(`Hourly notification sent at ${new Date().toISOString()}`);
    } catch (error) {
        console.error('Failed to send hourly notification');
    }
}

async function minuteNotification() {
    try {
        const response = await fetch(`${BASE_URL}/notifyMinute`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${CRON_SECRET}`,
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok) {
            throw new Error('Failed to send minute notification');
        }

        console.log(`Minute notification sent at ${new Date().toISOString()}`);
    } catch (error) {
        console.error('Failed to send minute notification');
    }
}

cron.schedule('30 * * * *', () => {
    hourlyNotification();
});
