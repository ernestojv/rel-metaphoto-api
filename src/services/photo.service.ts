import Boom from '@hapi/boom';
import 'dotenv/config';
import { Photo } from '../interfaces/Photo';
import { AlbumService } from './album.service';
import { UserService } from './user.service';

const apiURL = process.env.API_URL;
const albumService = new AlbumService();
let photosCache: Record<number, Photo> = {};
export class PhotoService {

    public async loadInitialData(): Promise<void> {
        {
            const response = await fetch(`${apiURL}/photos`);
            let photos = await response.json();
            photos.forEach((photo: Photo) => {
                photosCache[photo.id] = photo;
            });
        }
    }

    public async getAllPhotos(): Promise<Photo[]> {
        if (Object.keys(photosCache).length === 0) {
            await this.loadInitialData();
            let data = Object.values(photosCache);
            let promisedData = data.map(async (photo: any) => {
                photo.album = await albumService.getAlbumById(photo.albumId);
                return photo;
            });
            data = await Promise.all(promisedData);
            return data;
        } else {
            let data = Object.values(photosCache);
            let promisedData = data.map(async (photo: any) => {
                photo.album = await albumService.getAlbumById(photo.albumId);
                return photo;
            });
            data = await Promise.all(promisedData);
            return data;
        }
    }

    public async getPhotoById(id: number): Promise<Photo> {
        if (photosCache[id]) {
            return photosCache[id];
        }
        try {
            const response = await fetch(`${apiURL}/photos/${id}`);
            return await response.json();
        } catch (error: any) {
            throw Boom.internal(error);
        }
    }

    public async filterPhotos(filters: any, limit: number, offset: number): Promise<Photo[]> {
        let data = await this.getAllPhotos();
        if (filters.title) {
            data = data.filter((photo: Photo) => photo.title.includes(filters.title));
        }
        if (filters['album.title']) {
            data = data.filter((photo: Photo) => {
                return photo.album.title.includes(filters['album.title'])
            });
        }
        if (filters['album.user.email']) {
            data = data.filter((photo: Photo) => {
                return photo.album.user.email == filters['album.user.email']
            });
        }
        if (limit != 0) {
            data = data.slice(offset, offset + limit);
        }

        return data;
    }

}
