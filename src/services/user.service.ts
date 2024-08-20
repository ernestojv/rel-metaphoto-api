import Boom from '@hapi/boom';
import 'dotenv/config';
import { User } from '../interfaces/User';

const apiURL = process.env.API_URL;
let usersCache: Record<number, User> = {};
export class UserService {

    public async loadInitialData(): Promise<void> {
        {
            try {
                const response = await fetch(`${apiURL}/users`);
                let users = await response.json();
                users.forEach((user: User) => {
                    usersCache[user.id] = user;
                });
                console.log('Users loaded');
            } catch (error: any) {
                console.log(error);
                throw Boom.internal(error);

            }
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
