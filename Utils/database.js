const mysql = require('mysql');
const promisyfy = require('util').promisify;

const config = require('../Config/config.json');

const pool=mysql.createPool(config.mysql);

const pool_query=promisyfy(pool.query).bind(pool);

module.exports={
    query: (sql,entity) => entity===null?pool_query(sql):pool_query(sql,entity)
}