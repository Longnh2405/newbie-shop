import { Router } from 'express';
import multer from 'multer';

import { wrapHandlerWithJSONResponse } from '../common/response';
import UploadController from '../controllers/upload.controller';
import { uploadMiddleware } from '../middleware';

const uploadRouter = Router();

uploadRouter.get('/:filePath', UploadController.get);

uploadRouter.post('/', uploadMiddleware.array('files'), wrapHandlerWithJSONResponse(UploadController.create));

export default uploadRouter;
