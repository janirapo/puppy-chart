'use strict';

module.exports = function(sequelize, DataTypes) {
    let Metric = sequelize.define(
        'Metric',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            unit: {
                type: DataTypes.STRING,
            },
        },
        {
            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,
            name: {
                singular: 'metric',
                plural: 'metrics',
            }
        },
    );

    Metric.associate = function(models) {
        models.Metric.hasMany(models.Measurement);
    };

    return Metric;
};
