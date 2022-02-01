//this class serves to use the querys without need of configure in others files
class Query{
constructor() {
const conexion=require('../database/database.js')
const util=require('util')//util can use async/await with mysql
this.query=util.promisify(conexion.query).bind(conexion)//configuration of util to use querys in mysql
}
async records(sql) { 
try {
const rows=await this.query(sql)
return rows; 
} catch (error) {
console.log(error)
}
}
}
module.exports=new Query() //I maked this to init the class when it's export


