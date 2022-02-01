let Querys=require("../database/querys.js")
const bcrypt=require('bcryptjs')
exports.signup=async(req,res)=>{
try {
const user=await Querys.records(`select*from user where email='${req.body.email}'`)
if(user.length<=0){
let name=req.body.name
let email=req.body.email
let password=req.body.password
const encryptedPassword=await bcrypt.hash(password,bcrypt.genSaltSync(10))
let sql=`INSERT INTO user (name,email,password) VALUES ("${name}","${email}","${encryptedPassword}")` 
await Querys.records(sql) 
res.status(200);
res.send('user create');
}
else{
res.status(400);
res.send('the email be use with other user'); 
}
} catch (error) {
console.log(error)
}
}

exports.signin=async(req,res)=>{ 
try {
let email=req.body.email
let password=req.body.password
console.log(email)
console.log(password)
const user=await Querys.records(`select*from user where email='${email}'`) 
if(user.length == 0){
res.status(204);
res.send('email not found');
}
else{
console.log(user[0].password)
const comparison=await bcrypt.compare(password,user[0].password)
if(comparison){
res.status(200);
res.send(user);
}
else{
res.status(204);
res.send('password not found');
}
}
} catch (error) {
console.log(error)
}
}