import Boom from '@hapi/boom';
import 'dotenv/config';
import { AlbumService } from './album.service';
import { User } from '../interfaces/User';

const apiURL = process.env.API_URL;
let usersCache: Record<number, User> = {};
export class UserService {

    public async loadInitialData(): Promise<void> {
        {
            const response = await fetch(`${apiURL}/users`);
            let photos = await response.json();
            photos.forEach((user: User) => {
                usersCache[user.id] = user;
            });
            console.log('Users loaded');
        }
    }

    public async getAllUsers(): Promise<User[]> {
        if (Object.keys(usersCache).length === 0) {

            await this.loadInitialData();
            return Object.values(usersCache);
        } else {
            return Object.values(usersCache);
        }
    }

    public async getUserById(id: number): Promise<User> {
        if (usersCache[id]) {
            return usersCache[id];
        }
        try {
            const response = await fetch(`${apiURL}/users/${id}`);
            return await response.json();
        } catch (error: any) {
            throw Boom.internal(error);
        }
    }
}
