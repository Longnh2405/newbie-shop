import { DataType } from 'sequelize-typescript';
import { Optional, Model } from 'sequelize';

import sequelize from '../configs/db.config';
import { IS_ACTIVE } from '../util/constant';

type ColorAttributes = {
    id: number;
    name: string;
    is_active: number;
};

type ColorCreationAttributes = Optional<ColorAttributes, 'id'>;

class color extends Model<ColorAttributes, ColorCreationAttributes> {
    declare id: number;
    declare name: string;
    declare is_active: number;
}

color.init(
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
        is_active: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: IS_ACTIVE.ACTIVE,
        },
    },
    {
        sequelize,
        modelName: 'color',
        freezeTableName: true,
        timestamps: false,
    },
);

export default color;
