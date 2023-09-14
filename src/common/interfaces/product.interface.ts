import { RequestHandler } from 'express';

export interface IProductController {
    getList: RequestHandler;
    create: RequestHandler;
    detail: RequestHandler;
    update: RequestHandler;
    delete: RequestHandler;
}

export interface IProductService {
    getList: RequestHandler;
    create: RequestHandler;
    detail: RequestHandler;
    update: RequestHandler;
    delete: RequestHandler;
}
