import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import photoRouter from './routes/photos.router';
import { AlbumService } from './services/album.service';
import { PhotoService } from './services/photo.service';
import { UserService } from './services/user.service';

const PORT = process.env.PORT ?? 3000;
const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Meta Photo API, go to /api/photos');
});

app.use('/api/photos', photoRouter);

app.listen(PORT, async () => {
    const userService = new UserService();
    await userService.loadInitialData();
    const albumService = new AlbumService();
    await albumService.loadInitialData();
    const photoService = new PhotoService();
    await photoService.loadInitialData();
    console.log(`Server is running on port ${PORT}, MetaPhoto API is ready`);
});