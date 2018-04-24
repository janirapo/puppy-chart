const models = require('../models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../../../config/local.config').secret;

exports.getAllUsers = function(cb, next) {
    return models.User.findAll()
        .then(cb)
        .catch(next);
};

exports.getUser = function(userId, cb, next) {
    return models.User.findById(userId)
        .then(cb)
        .catch(next);
};

exports.findUserByEmail = function(email, cb, next) {
    return models.User.findOne({ where: { email: email } })
        .then(cb)
        .catch(next);
};

exports.validPassword = function(user, password) {
    const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
    return user.password === hash;
};

_getPasswordHashAndSalt = function(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    return {
        password: crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex'),
        salt: salt,
    };
};

exports.generateJWT = function(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            exp: parseInt(exp.getTime()),
        },
        secret,
    );
};

exports.toAuthJSON = function(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: this.generateJWT(user),
    };
};

exports.addUser = function(cb, next) {
    // TODO
    // store.ready(async () => {
    //     store.Model('User').then(cb).catch(next);
    // });
};

exports.updateUser = function(cb, next) {
    // TODO
    // store.ready(async () => {
    //     store.Model('User').then(cb).catch(next);
    // });
};
