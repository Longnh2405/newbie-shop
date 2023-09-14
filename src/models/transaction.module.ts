import { DataType } from 'sequelize-typescript';
import { Optional, Model } from 'sequelize';

import sequelize from '../configs/db.config';
import order from './order.module';

type TransactionAttributes = {
    id: number;
    pay_id: string;
    order_id: number;
    name: string;
    email: string;
    payment_source: string;
    created_at: string;
    create_time: string;
};

type TransactionCreationAttributes = Optional<TransactionAttributes, 'id'>;

class transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {
    declare id: number;
    declare pay_id: string;
    declare order_id: number;
    declare name: string;
    declare email: string;
    declare payment_source: string;
    declare created_at: string;
    declare create_time: string;
}

transaction.init(
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        pay_id: {
            type: DataType.STRING(255),
            allowNull: true,
        },
        order_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'order',
                key: 'id',
            },
        },
        name: {
            type: DataType.STRING(255),
            allowNull: true,
        },
        email: {
            type: DataType.STRING(255),
            allowNull: true,
        },
        payment_source: {
            type: DataType.STRING(255),
            allowNull: true,
        },
        created_at: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        create_time: {
            type: DataType.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'transaction',
        freezeTableName: true,
        timestamps: false,
    },
);

transaction.belongsTo(order, { foreignKey: 'order_id' });

export default transaction;
