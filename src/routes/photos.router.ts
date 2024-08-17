import { Router } from 'express';
import {
    getPhotoById,
    getFilteredPhotos
} from '../controllers/photo.controller';

const photoRouter = Router();

photoRouter.get('/', getFilteredPhotos);

photoRouter.get('/:id', getPhotoById);


export default photoRouter;
