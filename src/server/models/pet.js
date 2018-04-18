'use strict';

module.exports = function(sequelize, DataTypes) {
    let Pet = sequelize.define(
        'Pet',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            birth_date: {
                type: DataTypes.DATE,
            },
            user_id: {
                type: DataTypes.INTEGER,
                onDelete: "CASCADE",
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id'
                }
            },
        },
        {
            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,
        },
    );

    Pet.associate = function(models) {
        models.Pet.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Pet;
};
