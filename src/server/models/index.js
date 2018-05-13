'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const dbConfig = process.env.USE_ENV_DB_CONFIG || require('../../../config/local.config').mysql;

const sequelize = new Sequelize({
    host: process.env.DB_HOST || dbConfig.host,
    username: process.env.DB_USER || dbConfig.user,
    password: process.env.DB_PASSWD || dbConfig.password,
    database: process.env.DB_NAME || dbConfig.database,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

fs
    .readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
