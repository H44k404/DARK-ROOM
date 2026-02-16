import express from 'express';
import prisma from './server/db.js';
import * as postController from './server/controllers/postController.js';

const app = express();
app.use(express.json());

app.get('/test-categories', postController.getCategories);

const server = app.listen(5001, async () => {
    console.log('Test server running on port 5001');
    try {
        const res = await fetch('http://localhost:5001/test-categories');
        const data = await res.json();
        console.log('Verification result:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Verification failed:', err.message);
    } finally {
        server.close();
    }
});
