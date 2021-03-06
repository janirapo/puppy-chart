import { User } from '../models';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { camelToUnderscore } from '../constants';

const secret = process.env.SECRET || require('~/config/local.config').secret;

export const getAllUsers = () => {
    return User.findAll();
};

export const getUser = (userId, cb, next) => {
    return User.findById(userId)
        .then(cb)
        .catch(next);
};

export const findUserByEmail = (email) => {
    return User.findOne({ where: { email: email } });
};

export const validPassword = (user, password) => {
    const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
    return user.password === hash;
};

const _getPasswordHashAndSalt = password => {
    const salt = crypto.randomBytes(16).toString('hex');
    return {
        password: crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex'),
        salt: salt,
    };
};

export const generateJWT = user => {
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

export const toAuthJSON = user => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateJWT(user),
    };
};

/**
 * Add new user to database
 *
 * @param userData
 * @param onSuccess
 * @param onFailure
 */
export const addUser = (userData, onSuccess, onFailure) => {
    // first check if user is found
    User.count({ where: { email: userData.email } })
        .then(c => {
            if (c > 0) {
                onFailure({ message: 'username_already_in_use', status: 403 });
            } else {
                const { password: passwordHash, salt } = _getPasswordHashAndSalt(userData.password);
                const newUser = User.build({
                    ...userData,
                    password: passwordHash,
                    salt: salt,
                });

                newUser
                    .save()
                    .then(onSuccess)
                    .catch(onFailure);
            }
        })
        .catch(onFailure);
};
