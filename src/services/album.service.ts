import Boom from '@hapi/boom';
import 'dotenv/config';
import { Album } from '../interfaces/Album';
import { UserService } from './user.service';

const apiURL = process.env.API_URL;
let albumsCache: Record<number, Album> = {};
const userService = new UserService();
export class AlbumService {
    public async loadInitialData(): Promise<void> {
        {
            const response = await fetch(`${apiURL}/albums`);
            let albums = await response.json();
            albums.forEach((album: Album) => {
                albumsCache[album.id] = album;
            });
            console.log('Albums loaded');
        }
    }

    public async getAlbumById(id: number): Promise<Album> {
        if (albumsCache[id]) {
            let data = albumsCache[id];
            data.user = await userService.getUserById(data.userId);
            return data;
        }
        try {
            const response = await fetch(`${apiURL}/albums/${id}`);
            let data = await response.json();
            data.user = await userService.getUserById(data.userId);
            return data;
        } catch (error: any) {
            throw Boom.internal(error);
        }
    }

    public async getAlbumsByTitle(title: string): Promise<Album[]> {
        return Object.values(albumsCache).filter((album: Album) => album.title.includes(title));
    }

}
