import { NextFunction, Request, Response } from 'express';

export default function paging(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { query } = req;

    if (!query.page) {
        query.page = '1';
    }
    if (!query.limit) {
        query.limit = '12';
    }

    const offset = (Number(query.page) - 1) * Number(query.limit);

    query.offset = String(offset);

    next();
}
