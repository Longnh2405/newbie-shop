import { Request } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, res: (error: Error | null, filename: string) => void) => {
        res(null, 'uploads');
    },

    filename: (_req: Request, file: Express.Multer.File, res: (error: Error | null, filename: string) => void) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        const fileName =
            file.originalname.split('.').shift() + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop();

        res(null, fileName);
    },
});

const upload = multer({ storage });

export default upload;
