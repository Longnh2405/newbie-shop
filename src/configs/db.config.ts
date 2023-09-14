import { Sequelize } from 'sequelize-typescript';

import envConfig from './env.config';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: envConfig.dbHost,
    username: envConfig.dbUser,
    password: envConfig.dbPassword,
    database: envConfig.dbDatabase,
    logging: false,
    query: { raw: false },
    timezone: '+07:00',
    dialectOptions: {
        multipleStatements: true,
    },
    pool: {
        max: 30,
        min: 0,
        acquire: 60000,
        idle: 5000,
    },
});

export const connectDB = () => {
    sequelize
        .sync()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((error) => {
            console.error('Unable to connect to the database:', error);
        });
};

export default sequelize;
