const Store = require('openrecord/store/mysql');
const dbConfig = require('../../config/local.config').mysql;

const store = new Store({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
});

export default store;
