import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';

import Image from '../models/image.module';
import Catalog from '../models/catalog.module';

import sequelize from '../configs/db.config';

import { ICatalogService } from '../common/interfaces/catalog.interface';
import { IS_ACTIVE } from '../util/constant';

async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const catalog = await Catalog.create({
            ...req.body,
        });

        return {
            data: catalog,
        };
    } catch (error) {
        console.log('Error createCatalog: ', error);
    }
}

async function getList(req: Request, res: Response, next: NextFunction) {
    try {
        const { page, limit, offset, search } = req.query;

        const { count, rows } = await Catalog.findAndCountAll({
            where: {
                name: {
                    [Op.substring]: String(search),
                },
                is_active: {
                    [Op.eq]: IS_ACTIVE.ACTIVE,
                },
            },
            include: [
                {
                    model: Image,
                    attributes: ['id', 'url'],
                },
            ],
            limit: Number(limit),
            offset: Number(offset),
        });

        return {
            data: rows,
            paging: {
                page: Number(page),
                limit: Number(limit),
                total: count,
            },
        };
    } catch (error) {
        console.log('Error getListCatalog: ', error);
    }
}

async function update(req: Request, res: Response, next: NextFunction) {
    try {
        await Catalog.update(
            {
                ...req.body,
                date_modify: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            { where: { id: req.params.id } },
        );

        return;
    } catch (error) {
        console.log('Error updateUser: ', error);
    }
}

const CatalogService: ICatalogService = {
    create,
    getList,
    update,
};

export default CatalogService;
