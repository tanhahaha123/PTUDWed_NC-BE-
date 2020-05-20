const mysql = require('mysql');
const promisyfy = require('util').promisify;

const pool=mysql.createPool({
    connectionlimit: 100,
    host: 'remotemysql.com',
    port:3306,
    user: '7zwzyanesh',
    password: 'kold7swll3',
    database: '7zwzyanesh',
});

const pool_query=promisyfy(pool.query).bind(pool);

module.exports={
    load: sql=>pool_query(sql),
    add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
}