const Pet = require('../model/Pet');

exports.getAllByUser = function(userId, cb) {
    Pet.findAll({ where: { user_id: userId } }).then(cb);
};
