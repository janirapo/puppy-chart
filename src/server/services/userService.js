const User = require('../model/User');

exports.getAllUsers = function(cb) {
    User.findAll().then(cb);
};

exports.getUser = function(userId, cb) {
    User.findById(userId).then(cb);
};

exports.addUser = function(cb) {
    // TODO
    store.ready(async () => {
        store.Model('User').then(cb);
    });
};

exports.updateUser = function(cb) {
    // TODO
    store.ready(async () => {
        store.Model('User').then(cb);
    });
};
