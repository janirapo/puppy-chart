'use strict';

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            salt: {
                type: DataTypes.STRING,
            },
        },
        {
            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,
        },
    );

    User.associate = function(models) {
        models.User.hasMany(models.Pet);
    };

    return User;
};
