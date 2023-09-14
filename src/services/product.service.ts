import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';

import sequelize from '../configs/db.config';

import ImageWithProduct from '../models/image_product.module';
import ProductDetail from '../models/product_detail.module';
import Catalog from '../models/catalog.module';
import Product from '../models/product.module';
import Image from '../models/image.module';
import Color from '../models/color.module';
import Size from '../models/size.module';

import { IProductService } from '../common/interfaces/product.interface';
import { IS_ACTIVE } from '../util/constant';

function queryFindByPk(id: number) {
    try {
        const product = Product.findByPk(id, {
            include: [
                {
                    model: Catalog,
                    include: [{ model: Image }],
                },
                {
                    model: ImageWithProduct,
                    as: 'image_with_product',
                    include: [{ model: Image }],
                },
                {
                    model: ProductDetail,
                    as: 'product_detail',
                    include: [{ model: Color }, { model: Size }],
                },
            ],
        });

        return product;
    } catch (error) {
        console.log('Error queryFindByPk: ', { error });
    }
}

async function getList(req: Request, res: Response, next: NextFunction) {
    try {
        const { page, limit, offset, search, catalog_id, color_id, size_id } = req.query;

        console.log({
            color_id: String(color_id).split(','),
            size_id: String(size_id).split(','),
        });

        const whereQuery: any = {
            name: {
                [Op.substring]: String(search),
            },
            is_active: {
                [Op.eq]: IS_ACTIVE.ACTIVE,
            },
        };
        if (catalog_id != '') {
            whereQuery.catalog_id = {
                [Op.or]: String(catalog_id).split(','),
            };
        }

        const whereQueryWithColor: any = {};
        if (color_id != '') {
            whereQueryWithColor.id = {
                [Op.or]: String(color_id).split(','),
            };
        }

        const whereQueryWithSize: any = {};
        if (size_id != '') {
            whereQueryWithSize.id = {
                [Op.or]: String(size_id).split(','),
            };
        }

        const { count, rows } = await Product.findAndCountAll({
            where: whereQuery,
            include: [
                {
                    model: Catalog,
                    include: [{ model: Image }],
                },
                {
                    model: ImageWithProduct,
                    as: 'image_with_product',
                    include: [{ model: Image }],
                },
                {
                    model: ProductDetail,
                    as: 'product_detail',
                    include: [
                        {
                            model: Color,
                            where: whereQueryWithColor,
                        },
                        {
                            model: Size,
                            where: whereQueryWithSize,
                        },
                    ],
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
        console.log('Error getListProduct: ', error);
    }
}

async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { body } = req;

        const { image_id, property, ...rest } = body;

        const { id } = await Product.create({
            ...rest,
        });

        await ImageWithProduct.bulkCreate(image_id.map((item: any) => ({ image_id: item, product_id: id })));
        await ProductDetail.bulkCreate(
            property.map((item: any) => ({
                product_id: id,
                color_id: item.color_id,
                size_id: item.size_id,
                amount: item.amount,
            })),
        );

        const product = await queryFindByPk(Number(id));

        return {
            data: product,
        };
    } catch (error) {
        console.log('Error createProduct: ', { error });
    }
}

async function detail(req: Request, res: Response, next: NextFunction) {
    try {
        const { params } = req;
        const product = await queryFindByPk(Number(params.id));
        return {
            data: product,
        };
    } catch (error) {
        console.log('Error getDetailProduct: ', { error });
    }
}

async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const { params, ...rest } = req;

        const { image_id, ...data } = rest.body;

        await ImageWithProduct.destroy({ where: { product_id: params.id } });

        await ImageWithProduct.bulkCreate(
            image_id.map((item: any) => ({ image_id: item, product_id: Number(params.id) })),
        );

        await ProductDetail.destroy({ where: { product_id: params.id } });

        await ProductDetail.bulkCreate(
            data.property.map((item: any) => ({
                product_id: params.id,
                color_id: item.color_id,
                size_id: item.size_id,
                amount: item.amount,
            })),
        );

        await Product.update(
            {
                ...data,
                date_modify: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            { where: { id: params.id } },
        );

        const product = await queryFindByPk(Number(params.id));
        return {
            data: product,
        };
    } catch (error) {
        console.log('Error updateProduct: ', { error });
    }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const { params } = req;
        await Product.update(
            {
                is_active: IS_ACTIVE.UN_ACTIVE,
                date_modify: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            { where: { id: params.id } },
        );
    } catch (error) {
        console.log('Error deleteProduct: ', { error });
    }
}

const ProductService: IProductService = {
    getList,
    create,
    detail,
    update,
    delete: deleteProduct,
};

export default ProductService;
