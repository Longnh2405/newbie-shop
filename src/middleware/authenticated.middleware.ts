import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.module';

import { IAuthRequest } from '../common/interfaces/auth.interface';
import { REQUEST_STATUS } from '../util/constant';
import envConfig from '../configs/env.config';
import * as LogEvent from '../util/logEvent';

export default async function authenticated(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.header('Authorization');

        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401);
        const decode: any = jwt.verify(token, envConfig.accessTokenSecret);

        const user = await User.findOne({ where: { id: decode.id } });

        LogEvent.logEvent(`${req.originalUrl}---${req.method}---user_id: ${decode.id}`);

        if (user.token === token) {
            req.userId = decode.id;

            next();
        } else {
            return res.sendStatus(REQUEST_STATUS.FORBIDDEN);
        }
    } catch (error) {
        console.log('Error authenticated: ', error);
        return res.sendStatus(REQUEST_STATUS.FORBIDDEN);
    }
}
