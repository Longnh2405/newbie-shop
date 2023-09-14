import { NextFunction, Request, Response } from 'express';
import path from 'path';

import { IUploadService } from '../common/interfaces/upload.interface';
import Image from '../models/image.module';

async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            params: { filePath },
        } = req;
        res.sendFile(`uploads/${filePath}`, { root: path.join(__dirname, '../../') });
    } catch (error) {
        console.log('Error getImage: ', { error });
    }
}

async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { files } = req;

        const multipleFile: Array<File> | any = files;

        const data = await Image.bulkCreate(
            multipleFile.map((file: any) => ({ url: `${file.destination}/${file.filename}` })),
        );

        const result = data.map((item: any) => {
            const { created_at, ...rest } = item.dataValues;

            return rest;
        });

        return {
            data: result,
        };
    } catch (error) {
        console.log('Error createImage: ', { error });
    }
}

const UploadService: IUploadService = {
    get,
    create,
};

export default UploadService;
