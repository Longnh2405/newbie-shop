import { RequestHandler } from 'express';

export interface IUserController {
    getDetails: RequestHandler;
    update: RequestHandler;
    changeActive: RequestHandler;
    changePassword: RequestHandler;
}

export interface IUserService {
    getDetails: RequestHandler;
    update: RequestHandler;
    changeActive: RequestHandler;
    changePassword: RequestHandler;
}
