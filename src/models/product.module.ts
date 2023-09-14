import { DataType } from 'sequelize-typescript';
import { Optional, Model } from 'sequelize';

import sequelize from '../configs/db.config';
import { IS_ACTIVE } from '../util/constant';
import catalog from './catalog.module';
import imageWithProduct from './image_product.module';
import productDetail from './product_detail.module';

type ProductAttribute = {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    // quantity: number;
    catalog_id: number;
    // color_id: number;
    // size_id: number;
    created_at: string;
    date_modify: string;
    is_active: number;
};

type ProductCreationAttributes = Optional<ProductAttribute, 'id'>;

class product extends Model<ProductAttribute, ProductCreationAttributes> {
    declare id: number;
    declare name: string;
    declare description: string;
    declare price: number;
    declare discount: number;
    // declare quantity: number;
    declare catalog_id: number;
    declare color_id: number;
    declare size_id: number;
    declare created_at: string;
    declare date_modify: string;
    declare is_active: number;
}

product.init(
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
        description: {
            type: DataType.STRING(10000),
            allowNull: false,
        },
        price: {
            type: DataType.DOUBLE,
            allowNull: true,
        },
        discount: {
            type: DataType.DOUBLE,
            allowNull: true,
        },
        catalog_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'catalog',
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
        modelName: 'product',
        freezeTableName: true,
        timestamps: false,
    },
);

product.belongsTo(catalog, { foreignKey: 'catalog_id' });

product.hasMany(productDetail, { as: 'product_detail', foreignKey: 'product_id' });

product.hasMany(imageWithProduct, { as: 'image_with_product', foreignKey: 'product_id' });

export default product;
