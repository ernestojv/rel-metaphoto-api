import { Request, Response } from 'express';
import Boom from '@hapi/boom';
import { PhotoService } from '../services/photo.service';

const photoService = new PhotoService();

export const getPhotoById = async (req: Request, res: Response) => {
    try {
        const photoId = parseInt(req.params.id);
        const photo = await photoService.getPhotoById(photoId);
        res.status(200).json(photo);
    } catch (error) {
        const { output } = error as Boom.Boom;
        res.status(output.statusCode).json(output.payload);
    }
};

export const getFilteredPhotos = async (req: Request, res: Response) => {
    try {
        const filters = req.query;
        const limit = parseInt(req.query.limit as string) || 0;
        const offset = parseInt(req.query.offset as string) || 0;

        const photos = await photoService.filterPhotos(filters, limit, offset);
        res.status(200).json(photos);
    } catch (error) {
        const { output } = error as Boom.Boom;
        res.status(output.statusCode).json(output.payload);
    }
};

