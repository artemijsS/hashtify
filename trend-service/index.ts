import express, { Express } from 'express';
import dotenv from 'dotenv';

import trendRoutes from './routes/trend.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8002;

app.use('/trends', trendRoutes);

app.listen(port, () => {
    console.log(`⚡️[trend-service]: Server is running at http://localhost:${port}`);
});
