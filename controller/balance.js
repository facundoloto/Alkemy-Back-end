let Querys=require("../database/querys.js")
exports.balance=async(param,res)=>{
const array=[]
try {
//userID and categoryID are the id of table user and category it use as foreign key
//function to show all the amount of entry/egress and do a balance with them
console.log(param.params.userID)
const getEntry=await Querys.records(`SELECT amount FROM records INNER JOIN user ON records.userID="${param.params.userID}" WHERE type="entry"`)
const getEgress=await Querys.records(`SELECT amount FROM records INNER JOIN user ON records.userID =user.id WHERE type="egress" and records.userID="${param.params.userID}"`)
console.log(getEntry)
console.log(getEgress)
let totalEntry=0
let totalEgress=0
if(getEntry.length!=0){
  getEntry.map(function(data){
    totalEntry=+data.amount
  })
}
if(getEgress.length!=0){
  getEgress.map(function(data){
    totalEgress=+data.amount
  })
}

let amount=totalEntry-totalEgress
const balance=[{
      "entry":`${totalEntry}`,
      "egress": `${totalEgress}`,
      "balance":`${amount}`
    }
      ]
    


array.push(balance)
res.send(balance)
}
catch(err){
console.log(err)
res.status(204);
res.send('there is an error,please try again');
}
}

exports.latestRecords=async(req,res)=>{ 
//function to show the last ten records 
try {
const get=await Querys.records(`select category.category,records.concept,records.type,records.amount,records.date FROM records INNER JOIN user ON records.userID =user.id INNER JOIN category on records.categoryID=category.id where records.userID="${req.params.userID}" ORDER BY records.id DESC LIMIT 10;`) 
res.send(get)
}
catch(err){
console.log(err)
res.status(204);
res.send('there is an error,please try again');
}
}