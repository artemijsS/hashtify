import express, { Express } from 'express';
import dotenv from 'dotenv';

import imageRoutes from './routes/image.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8001;

app.use('/images', imageRoutes);

app.listen(port, () => {
    console.log(`⚡️[image-service]: Server is running at http://localhost:${port}`);
});
