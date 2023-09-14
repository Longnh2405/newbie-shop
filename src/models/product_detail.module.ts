import { DataType } from 'sequelize-typescript';
import { Optional, Model } from 'sequelize';

import sequelize from '../configs/db.config';
import color from './color.module';
import size from './size.module';
import product from './product.module';
import orderDetail from './order_detail.module';

type ProductDetailAttributes = {
    id: number;
    product_id: number;
    color_id: number;
    size_id: number;
    amount: number;
};

type ProductDetailCreationAttributes = Optional<ProductDetailAttributes, 'id'>;

class productDetail extends Model<ProductDetailAttributes, ProductDetailCreationAttributes> {
    declare id: number;
    declare product_id: number;
    declare color_id: number;
    declare size_id: number;
    declare amount: number;
}

productDetail.init(
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'product',
                key: 'id',
            },
        },
        color_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'color',
                key: 'id',
            },
        },
        size_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'size',
                key: 'id',
            },
        },
        amount: {
            type: DataType.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'product-detail',
        freezeTableName: true,
        timestamps: false,
    },
);

productDetail.belongsTo(color, { foreignKey: 'color_id' });

productDetail.belongsTo(size, { foreignKey: 'size_id' });

export default productDetail;
