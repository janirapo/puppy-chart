'use strict';

module.exports = function(sequelize, DataTypes) {
    let Measurement = sequelize.define(
        'Measurement',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            value: {
                type: DataTypes.FLOAT,
            },
            measurement_dt: {
                type: DataTypes.DATE,
            },
            user_id: {
                type: DataTypes.INTEGER,
                onDelete: "NO ACTION",
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id'
                }
            },
            metric_id: {
                type: DataTypes.INTEGER,
                onDelete: "NO ACTION",
                allowNull: false,
                references: {
                    model: 'Metric',
                    key: 'id'
                }
            },
            pet_id: {
                type: DataTypes.INTEGER,
                onDelete: "NO ACTION",
                allowNull: false,
                references: {
                    model: 'Pet',
                    key: 'id'
                }
            },
        },
        {
            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,
            name: {
                singular: 'measurement',
                plural: 'measurements',
            }
        },
    );

    Measurement.associate = function(models) {
        models.Measurement.belongsTo(models.Metric, {
            onDelete: 'NO ACTION',
            foreignKey: {
                allowNull: false,
            },
        });

        models.Measurement.belongsTo(models.Pet, {
            onDelete: 'NO ACTION',
            foreignKey: {
                allowNull: false,
            },
        });

        models.Measurement.belongsTo(models.User, {
            onDelete: 'NO ACTION',
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Measurement;
};
