import { RequestHandler } from 'express';

export interface IUploadController {
    get: RequestHandler;
    create: RequestHandler;
}

export interface IUploadService {
    get: RequestHandler;
    create: RequestHandler;
}
