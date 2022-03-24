
import mysql from 'mysql2/promise'

// create connection to database
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'minteaDB'
});


export default pool