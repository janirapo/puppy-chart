import models from '../models';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const secret = process.env.SECRET || require('~/config/local.config').secret;

export const getAllUsers = (cb, next) => {
    return models.User.findAll()
        .then(cb)
        .catch(next);
};

export const getUser = (userId, cb, next) => {
    return models.User.findById(userId)
        .then(cb)
        .catch(next);
};

export const findUserByEmail = (email, cb, next) => {
    return models.User.findOne({ where: { email: email } })
        .then(cb)
        .catch(next);
};

export const validPassword = (user, password) => {
    const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
    return user.password === hash;
};

const _getPasswordHashAndSalt = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    return {
        password: crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex'),
        salt: salt,
    };
};

export const generateJWT = (user) => {
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

export const toAuthJSON = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: this.generateJWT(user),
    };
};

export const addUser = (cb, next) => {
    // TODO
    // store.ready(async () => {
    //     store.Model('User').then(cb).catch(next);
    // });
};

export const updateUser = (cb, next) => {
    // TODO
    // store.ready(async () => {
    //     store.Model('User').then(cb).catch(next);
    // });
};
