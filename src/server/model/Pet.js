const Sequelize = require('sequelize');
const sequelize = require('../db');

const Pet = sequelize.define(
    'pet',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        birth_date: {
            type: Sequelize.DATE,
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
    },
    {
        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,
    },
);

module.exports = Pet;
