import { DataType } from 'sequelize-typescript';
import { Optional, Model } from 'sequelize';

import image from './image.module';
import product from './product.module';

import sequelize from '../configs/db.config';

type ImageWithProductAttribute = {
    id: number;
    image_id: number;
    product_id: number;
};

type ImageWithProductCreationAttributes = Optional<ImageWithProductAttribute, 'id'>;

class imageWithProduct extends Model<ImageWithProductAttribute, ImageWithProductCreationAttributes> {
    declare id: number;
    declare image_id: number;
    declare product_id: number;
}

imageWithProduct.init(
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        image_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'image',
                key: 'id',
            },
        },
        product_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'product',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'image-with-product',
        freezeTableName: true,
        timestamps: false,
    },
);

imageWithProduct.belongsTo(image, { foreignKey: 'image_id' });

export default imageWithProduct;
