import { RequestHandler } from 'express';

export interface ICatalogController {
    create: RequestHandler;
    getList: RequestHandler;
    update: RequestHandler;
}

export interface ICatalogService {
    create: RequestHandler;
    getList: RequestHandler;
    update: RequestHandler;
}
