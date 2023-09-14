import { DataType } from 'sequelize-typescript';
import { Optional, Model } from 'sequelize';

import sequelize from '../configs/db.config';
import { IS_ACTIVE, ROLE } from '../util/constant';
import order from './order.module';

type UserAttributes = {
    id: number;
    name: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    token: string;
    refresh_token: string;
    role: number;
    created_at: string;
    is_active: number;
};

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class user extends Model<UserAttributes, UserCreationAttributes> {
    declare id: number;
    declare name: string;
    declare password: string;
    declare phone: string;
    declare email?: string;
    declare address?: string;
    declare token?: string;
    declare refresh_token?: string;
    declare role: number;
    declare created_at: string;
    declare is_active: number;
}

user.init(
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataType.STRING(255),
            allowNull: false,
        },
        password: {
            type: DataType.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataType.STRING(32),
            allowNull: false,
        },
        email: {
            type: DataType.STRING(45),
            allowNull: true,
        },
        address: {
            type: DataType.STRING(500),
            allowNull: true,
        },
        token: {
            type: DataType.STRING(255),
            allowNull: true,
        },
        refresh_token: {
            type: DataType.STRING(255),
            allowNull: true,
        },
        role: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: ROLE.USER,
        },
        created_at: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        is_active: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: IS_ACTIVE.ACTIVE,
        },
    },
    {
        sequelize,
        modelName: 'user',
        freezeTableName: true,
        timestamps: false,
    },
);

user.hasMany(order, { foreignKey: 'user_id' });

export default user;
