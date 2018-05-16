const User = (sequelize, DataTypes) => {
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
            name: {
                singular: 'user',
                plural: 'users',
            },
        },
    );

    User.associate = models => {
        models.User.hasMany(models.Pet);
        models.User.hasMany(models.Measurement);
    };

    return User;
};

export default User;
