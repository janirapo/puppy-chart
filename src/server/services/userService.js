const store = require('../dbStore');

exports.getAllUsers = function(cb) {
    store.ready(async () => {
        store.Model('User').then(cb);
    });
};

exports.getUser = function(userId, cb) {
    store.ready(async () => {
        store.Model('User').find(userId).then(cb);
    });
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
