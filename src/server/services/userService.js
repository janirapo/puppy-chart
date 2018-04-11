const User = require('../model/User');

exports.getAllUsers = function(cb, next) {
    User.findAll().then(cb).catch(next);
};

exports.getUser = function(userId, cb, next) {
    User.findById(userId).then(cb).catch(next);
};

exports.addUser = function(cb, next) {
    // TODO
    store.ready(async () => {
        store.Model('User').then(cb).catch(next);
    });
};

exports.updateUser = function(cb, next) {
    // TODO
    store.ready(async () => {
        store.Model('User').then(cb).catch(next);
    });
};
