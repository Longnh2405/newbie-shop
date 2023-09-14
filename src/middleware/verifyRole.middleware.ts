import { Response, NextFunction } from 'express';

import User from '../models/user.module';

import { IAuthRequest } from '../common/interfaces/auth.interface';
import { REQUEST_STATUS } from '../util/constant';

export default function verifyRole(roles: Array<number>) {
    return async function (
        req: IAuthRequest,
        res: Response,
        next: NextFunction,
    ) {
        const user = await User.findOne({ where: { id: req.userId } });

        const verify = roles.includes(user.role);

        if (verify) {
            next();
        } else {
            res.sendStatus(REQUEST_STATUS.METHOD_NOT_ALLOWED);
        }
    };
}
