const store = require('../dbStore');

exports.getAllByUser = function(userId, cb) {
    store.ready(async () => {
        store
            .Model('Pet')
            .where({ user_id: userId })
            .then(cb);
    });
};
