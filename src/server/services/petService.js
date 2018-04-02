const store = require('../dbStore');

exports.getAllByUser = function(userId, cb) {
    store.ready(async () => {
        store
            .Model('Pet')
            .join('users')
            .where({ users: { id: userId } })
            .then(cb);
    });
};
