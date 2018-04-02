const Store = require('openrecord/store/mysql');
const dbConfig = require('../../config/local.config').mysql;

const store = new Store({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    autoLoad: true,
});

store.Model('User', function() {
    this.hasMany('pets', { foreign_key: 'user_id', autoSave: true });
});

store.Model('Pet', function() {
    this.hasOne('User');
});

module.exports = store;
