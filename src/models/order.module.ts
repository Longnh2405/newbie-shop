import { ORDER_STATUS, PAYMENT_STATUS } from './../util/constant';
import { DataType } from 'sequelize-typescript';
import { Optional, Model } from 'sequelize';

import sequelize from '../configs/db.config';
import orderDetail from './order_detail.module';

type OrderAttributes = {
    id: number;
    user_id: number;
    pre_promotion_payment_total: number;
    post_promotion_payment_total: number;
    payment_status: number;
    status: number;
    created_at: string;
    date_modify: string;
};

type OrderCreationAttributes = Optional<OrderAttributes, 'id'>;

class order extends Model<OrderAttributes, OrderCreationAttributes> {
    declare id: number;
    declare user_id: number;
    declare payment_status: number;
    declare status: number;
    declare created_at: string;
    declare date_modify: string;
    order_detail: any;
}

order.init(
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        pre_promotion_payment_total: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        post_promotion_payment_total: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        payment_status: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: ORDER_STATUS.WAIT_FOR_CONFIRMATION,
        },
        status: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: PAYMENT_STATUS.PENDING,
        },
        created_at: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        date_modify: {
            type: DataType.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'order',
        freezeTableName: true,
        timestamps: false,
    },
);

order.hasMany(orderDetail, { as: 'order_detail', foreignKey: 'order_id' });

export default order;
