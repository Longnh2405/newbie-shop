// import { Sequelize } from 'sequelize';
// import path from 'path';
// import fs from 'fs';

// import sequelize from '@configs/db.config';

// const basename = path.basename(__filename);

// type DB = Record<string, any>;

// const db: DB = {};
// const sequelizeCustom: any = sequelize;

// fs.readdirSync(__dirname)
//     .filter((file: any) => {
//         console.log('file: ', file);
//         return (
//             file.indexOf('.') !== 0 &&
//             file !== basename &&
//             file.slice(-3) === '.ts'
//         );
//     })
//     // .forEach((file: any) => {
//     //     console.log('file2: ', file);
//     //     var model = sequelizeCustom.import(path.join(__dirname, file));
//     //     db[model.name] = model;
//     // });
//     .forEach(function (file: any) {
//         // console.log(file);
//         const model = sequelizeCustom['import'](path.join(__dirname, file));
//         // NOTE: you have to change from the original property notation to
//         // index notation or tsc will complain about undefined property.
//         db[model['name']] = model;
//     });

// Object.keys(db).forEach((modelName: any) => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

// db.sequelize = sequelizeCustom;
// db.Sequelize = Sequelize;

// export default db;

// import * as fs from 'fs';
// import * as path from 'path';
// import * as Sequelize from 'sequelize';
// const basename = path.basename(module.filename);
// import sequelize from '@configs/db.config';
// let db = {};
// fs.readdirSync(__dirname)
//     .filter((file: string) => {
//         // console.log(file);
//         // console.log(path.join(__dirname, file));
//         return (
//             file.indexOf('.') !== 0 &&
//             file !== basename &&
//             (file.slice(-3) === '.ts' || file.slice(-3) === '.js')
//         );
//     })
//     .forEach((file: string) => {
//         // console.log(file);
//         const model = sequelize.import(path.join(__dirname, file));
//         // NOTE: you have to change from the original property notation to
//         // index notation or tsc will complain about undefined property.
//         db[model.name] = model;
//     });
// Object.keys(db).forEach(function (modelName) {
//     // console.log(modelName);
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

// db['sequelize'] = sequelize;
// db['Sequelize'] = Sequelize;

// export default db;
