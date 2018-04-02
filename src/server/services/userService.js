const store = require('../dbStore');

exports.getUser = function(cb) {
    store.ready(async () => {
        store.Model('User').then(cb);
    });
};
