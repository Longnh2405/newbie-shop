import { DataType } from 'sequelize-typescript';
import { Optional, Model } from 'sequelize';

import sequelize from '../configs/db.config';
import productDetail from './product_detail.module';

type OrderDetailAttributes = {
    id: number;
    product_detail_id: number;
    order_id: number;
    amount: number;
    price: number;
    discount: number;
};

type OrderDetailCreationAttributes = Optional<OrderDetailAttributes, 'id'>;

class orderDetail extends Model<OrderDetailAttributes, OrderDetailCreationAttributes> {
    declare id: number;
    declare product_detail_id: number;
    declare order_id: number;
    declare amount: number;
    declare price: number;
    declare discount: number;
}

orderDetail.init(
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        product_detail_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'product-detail',
                key: 'id',
            },
        },
        order_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'order',
                key: 'id',
            },
        },
        amount: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        price: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        discount: {
            type: DataType.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'order-detail',
        freezeTableName: true,
        timestamps: false,
    },
);

// orderDetail.hasMany(productDetail, { as: 'product_detail', foreignKey: 'product_detail_id' });

export default orderDetail;
