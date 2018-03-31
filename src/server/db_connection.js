let db = require('node-mysql');
let cps = require('cps');
let DB = db.DB;

const dbConfig = require('../../config/local.config').mysql;

let box = new DB({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    connectionLimit: 50,
    useTransaction: {
        connectionLimit: 20,
    },
    useCursor: {
        connectionLimit: 1
    }
});

exports.getUser = function(cb) {
    // TODO: Implement passing of user id and returning of only that user
    box.connect(function(conn, cb) {
        cps.seq([
            function(_, cb) {
                conn.query('select * from user limit 1', cb);
            },
            function(res, cb) {
                cb(res);
            }
        ], cb);
    }, cb);
};

exports.getPets = function(cb) {
    box.connect(function(conn, cb) {
        cps.seq([
            function(_, cb) {
                conn.query('select * from pet limit 1', cb);
            },
            function(res, cb) {
                cb(res);
            }
        ], cb);
    }, cb);
};

