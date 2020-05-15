const mysql = require('mysql');
const promisyfy = require('util').promisify;

const pool=mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    port:3306,
    user: 'root',
    password: '123456',
    database: 'banking'
});

const pool_query=promisyfy(pool.query).bind(pool);

module.exports={
    load: sql=>pool_query(sql),
    add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
}