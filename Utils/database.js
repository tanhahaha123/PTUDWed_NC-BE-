const mysql=require('mysql');
const promisyfy=require('util').promisify;

const pool=mysql.createPool({
    connectionLimit:100,
    host:'99.000webhost.io',
    port:3306,
    user:'id13624379_user',
    password:'fc({C&>SmN88faPY',
    database:'id13624379_banking'
});

const pool_query=promisyfy(pool.query).bind(pool);

module.exports={
    load: sql=>pool_query(sql),
}