let Querys=require("../database/querys.js")
exports.createRecords=async(req,res)=>{ //function to create a new record
try {
let amount=parseFloat(req.body.amount)
let sql=`INSERT INTO records(userID,categoryID,concept,type, amount, date) VALUES ("${req.body.userID}","${req.body.category}","${req.body.concept}","${req.body.type}","${amount}","${req.body.date}")` //importante declarar las consultas sin olvidar comillas no parentisis
await Querys.records(sql) 
res.status(200);
res.send('record create');
} catch (error) {
res.status(204);
res.send('there is an error,please try again');
console.log(error)
}
}

exports.type=async(req,res)=>{ 
//userID and categoryID are the id of table user and category it use as foreign key
//function to show records for type entry/egress
try {
const get=await Querys.records(`select records.id, category.category,records.concept,records.type,records.amount,records.date FROM records INNER JOIN category ON records.categoryID=category.id where type="${req.body.type}" and userID="${req.body.userID}"`) 
res.send(get)
}
catch(err){
console.log(err)
res.status(204);
res.send('there is an error,please try again');
}
}

exports.getCategory=async(req,res)=>{ 
//userID and categoryID are the id of table user and category it use as foreign key
//function to show records for category
try {
const get=await Querys.records(`select category.category,records.concept,records.type,records.amount,records.date FROM records INNER JOIN user ON records.userID="${req.body.userID}" INNER JOIN category ON category.id="${req.body.categoryID}"`) 
res.send(get)
}
catch(err){
console.log(err)
res.status(204);
res.send('there is an error,please try again');
}
}

exports.updateRecord=async(req,res)=>{ 
//userID and categoryID are the id of table user and category it use as foreign key
//function to update records
try {
console.log(req.body.categoryID)
await Querys.records(`UPDATE records SET categoryID='${req.body.categoryID}',concept="${req.body.concept}",amount="${req.body.amount}",date="${req.body.date}" where id="${req.body.id}" `) 

res.status(200);
res.send('record update');
}
catch(err){
console.log(err)
res.status(204);
res.send('there is an error,please try again');
}
}

exports.deleteRecord=async(req,res)=>{ 
//function to delete record
try {
await Querys.records(`DELETE FROM records WHERE id='${req.body.id}'`) 
const get=await Querys.records(`select records.id, category.category,records.concept,records.type,records.amount,records.date FROM records INNER JOIN category ON records.categoryID=category.id where type="${req.body.type}" and userID="${req.body.userID}"`) 
res.send(get)
res.status(200);
}
catch(err){
console.log(err)
res.status(204);
res.send('there is an error,please try again');
}
}

exports.getRecord=async(req,res)=>{
    //function that show all category
        try {
        console.log("aca funka")
            const get=await Querys.records(`select category.category,records.concept,records.amount,records.date FROM records INNER JOIN user ON records.userID=user.id INNER JOIN category ON category.id=records.categoryID where records.id=${req.body.id}`) 
        res.status(200);
        res.send(get);
        } 
        catch (error) {
        console.log(error)
        res.status(204);
        res.send('there is an error,please try again')
        }
        }
    