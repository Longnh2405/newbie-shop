import { NextFunction, Request, RequestHandler, Response } from 'express';

import OrderDetail from '../models/order_detail.module';
import Order from '../models/order.module';
import Product from '../models/product.module';
import sequelize from '../configs/db.config';
import ProductDetail from '../models/product_detail.module';
import User from '../models/user.module';
import Transaction from '../models/transaction.module';
import Color from '../models/color.module';
import Size from '../models/size.module';

interface IOrderService {
    get: RequestHandler;
    create: RequestHandler;
    update: RequestHandler;
}

function updateFindByPk(id: number, data: Record<string, any>) {
    return Order.update(
        {
            ...data,
            date_modify: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        { where: { id } },
    );
}

async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id, page, limit, offset } = req.query;

        const whereWithOrder: any = {};

        if (user_id) whereWithOrder.user_id = String(user_id);

        const users = await User.findAll();
        const transactions = await Transaction.findAll();

        const { count, rows } = await Order.findAndCountAll({
            where: whereWithOrder,
            include: [
                {
                    model: OrderDetail,
                    as: 'order_detail',
                },
            ],
            limit: Number(limit),
            offset: Number(offset),
        });

        const data = rows.map((o: any) => {
            const { id: user_id, name, phone, address, email } = users.find((u) => u.id === o.dataValues.user_id);

            const transaction = transactions.find((t) => t.order_id === o.dataValues.id);

            return {
                ...o.dataValues,
                user: { user_id, name, phone, address, email },
                transaction,
            };
        });

        return {
            data,
            paging: {
                page: Number(page),
                limit: Number(limit),
                total: count,
            },
        };
    } catch (error) {
        console.log('Error get order: ', { error });
        return {
            message: 'Lỗi mất rồi!',
            error,
        };
    }
}

async function create(req: Request | any, res: Response, next: NextFunction) {
    try {
        const { userId, body } = req;

        const products = await Product.findAll();
        const productDetail = await ProductDetail.findAll();

        const order = await Order.create({
            user_id: userId,
        });

        await OrderDetail.bulkCreate(
            body.map((prod: any) => {
                const productSelected: Product = products.find((p) => p.id === prod.product_id);
                const { amount } = productDetail.find((p) => p.id === prod.product_detail_id);

                ProductDetail.update({ amount: amount - prod.amount }, { where: { id: prod.product_detail_id } });

                return {
                    order_id: order.id,
                    product_detail_id: prod.product_detail_id,
                    amount: prod.amount,
                    price: productSelected?.price,
                    discount: productSelected?.discount,
                };
            }),
        );

        const orderDetail = await Order.findByPk(order.id, {
            include: [
                {
                    model: OrderDetail,
                    as: 'order_detail',
                },
            ],
        });

        const pre_promotion_payment_total = orderDetail.order_detail.reduce(
            (accumulator: number, currentValue: OrderDetail) => {
                return accumulator + currentValue.price;
            },
            0,
        );

        const post_promotion_payment_total = orderDetail.order_detail.reduce(
            (accumulator: number, currentValue: OrderDetail) => {
                return accumulator + currentValue.discount;
            },
            0,
        );

        updateFindByPk(order.id, { pre_promotion_payment_total, post_promotion_payment_total });

        return {
            data: { ...orderDetail.dataValues, pre_promotion_payment_total, post_promotion_payment_total },
        };
    } catch (error) {
        console.log('Error createOrder: ', error);
    }
}

async function update(req: Request | any, res: Response, next: NextFunction) {
    try {
        updateFindByPk(req.params.id, req.body);

        return {
            message: 'Cập nhật đơn hàng thành công!',
        };
    } catch (error) {
        console.log('Error updateOrder: ', { error });
    }
}

const OrderService: IOrderService = {
    get,
    create,
    update,
};

export default OrderService;
