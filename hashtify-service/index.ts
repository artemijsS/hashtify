import express, { Express } from 'express';
import dotenv from 'dotenv';

import hashtagRoutes from './routes/hashtag.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use('/hashtags', hashtagRoutes);

app.listen(port, () => {
    console.log(`⚡️[hashtify-service]: Server is running at http://localhost:${port}`);
});
