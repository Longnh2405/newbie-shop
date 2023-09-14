import { DataType } from 'sequelize-typescript';
import { Optional, Model } from 'sequelize';

import sequelize from '../configs/db.config';
import { IS_ACTIVE } from '../util/constant';
import image from './image.module';

type CatalogAttributes = {
    id: number;
    name: string;
    image_id: string;
    created_at: string;
    date_modify: string;
    is_active: number;
};

type CatalogCreationAttributes = Optional<CatalogAttributes, 'id'>;

class catalog extends Model<CatalogAttributes, CatalogCreationAttributes> {
    declare id: number;
    declare name: string;
    declare image_id: string;
    declare created_at: string;
    declare date_modify: string;
    declare is_active: number;
}

catalog.init(
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
        image_id: {
            type: DataType.INTEGER,
            allowNull: true,
            references: {
                model: 'image',
                key: 'id',
            },
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
        is_active: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: IS_ACTIVE.ACTIVE,
        },
    },
    {
        sequelize,
        modelName: 'catalog',
        freezeTableName: true,
        timestamps: false,
    },
);

catalog.belongsTo(image, { foreignKey: 'image_id' });

export default catalog;
