import { DataType } from 'sequelize-typescript';
import { Optional, Model } from 'sequelize';

import sequelize from '../configs/db.config';

type ImageAttributes = {
    id: number;
    url: string;
    created_at: string;
};

type ImageCreationAttributes = Optional<ImageAttributes, 'id'>;

class image extends Model<ImageAttributes, ImageCreationAttributes> {
    declare id: number;
    declare url: string;
    declare create_at: string;
}

image.init(
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataType.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        sequelize,
        modelName: 'image',
        freezeTableName: true,
        timestamps: false,
    },
);

export default image;
