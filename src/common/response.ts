import { Request, Response, NextFunction, RequestHandler } from 'express';

import { REQUEST_STATUS } from '../util/constant';

export function wrapHandlerWithJSONResponse(handler: RequestHandler | any) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            let result = await handler(req, res);

            return res.status(REQUEST_STATUS.OK).json({
                status: REQUEST_STATUS.OK,
                message: 'Thành công',
                ...result,
            });
        } catch (error) {
            next(error);
        }
    };
}
