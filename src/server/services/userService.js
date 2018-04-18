const models = require('../models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../../../config/local.config').secret;

exports.getAllUsers = function(cb, next) {
    return models.User.findAll().then(cb).catch(next);
};

exports.getUser = function(userId, cb, next) {
    return models.User.findById(userId).then(cb).catch(next);
};

exports.findUserByEmail = function(email, cb, next) {
    return models.User.findOne({where: { email: email }}).then(cb).catch(next);
};

exports.validPassword = function(user, password) {
    const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
    return user.password === hash;
};

// UserSchema.methods.setPassword = function(password){
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// UserSchema.methods.generateJWT = function() {
//     var today = new Date();
//     var exp = new Date(today);
//     exp.setDate(today.getDate() + 60);
//
//     return jwt.sign({
//         id: this._id,
//         username: this.username,
//         exp: parseInt(exp.getTime() / 1000),
//     }, secret);
// };
//
// UserSchema.methods.toAuthJSON = function(){
//     return {
//         username: this.username,
//         email: this.email,
//         token: this.generateJWT(),
//         bio: this.bio,
//         image: this.image
//     };
// };

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
