import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import photoRouter from './routes/photos.router';

const PORT = process.env.PORT ?? 3000;
const app = express();


app.use(cors());
app.use(express.json());

app.use('api/photos', photoRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});