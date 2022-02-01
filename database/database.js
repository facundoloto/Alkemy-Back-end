require('dotenv').config()
const mysql=require('mysql')
const conexion=mysql.createPool({ //configuration of mysql I use createPool for that mysql don't close and open the connections evertime 
    connectionLimit : 20,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME 
    })
    //conexion.Promise=global.Promise 
 



module.exports=conexion
