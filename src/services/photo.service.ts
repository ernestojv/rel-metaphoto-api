import Boom from '@hapi/boom';
import 'dotenv/config';

const apiURL = process.env.API_URL;
export class PhotoService {

    public async getAllPhotos() {
        try {
            const response = await fetch(`${apiURL}/photos`);
            return await response.json();
        } catch (error: any) {
            throw Boom.internal(error);
        }
    }

    public async getPhotoById(id: number) {
        try {
            const response = await fetch(`${apiURL}/photos/${id}`);
            return await response.json();
        } catch (error: any) {
            throw Boom.internal(error);
        }
    }

    public async filterPhotos(filters: any, limit: number, offset: number) {
        return this.getAllPhotos();
    }

}
