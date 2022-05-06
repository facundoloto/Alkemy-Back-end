/*let Querys=require("../database/querys.js")
exports.balance=async(param,res)=>{
const array=[]
try {
//userID and categoryID are the id of table user and category it use as foreign key
//function to show all the amount of entry/egress and do a balance with them
const getEntry=await Querys.records(`SELECT amount FROM records INNER JOIN user ON records.userID=user.id WHERE type="entry" and records.userID="${param.params.userID}"`)
const getEgress=await Querys.records(`SELECT amount FROM records INNER JOIN user ON records.userID =user.id WHERE type="egress" and records.userID="${param.params.userID}"`)
let totalEntry=0
let totalEgress=0
if(getEntry.length!=0){
  getEntry.map(function(data){
    totalEntry+=data.amount
  })
}
if(getEgress.length!=0){
  getEgress.map(function(data){
    totalEgress+=data.amount
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
*/
const { validationResult } = require('express-validator');

const {
  OK,
  ACCEPTED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require('../../constants/httpCodes');
const db = require('../../models');

const getBalance = async (req, res) => {
  let result={}
  try {
    const entry = await db.Records.findAll({
      attributes: ['amount'],
      where: {
        typeId: 1,
        userId: `${req.params.id}`,
      },
    });

    const egress = await db.Records.findAll({
      attributes: ['amount'],
      where: {
        typeId: 2,
        userId: `${req.params.id}`,
      },
    });
  if(entry.length!==0 && egress.length!==0){
  result={'entry':entry} 
  }
  else{
 result={
  'entry': entry,
  'egress': egress,
 }
}
    res.status(OK).json({
      ok: true,
      msg: 'Success',
      balance: result,
    });
  } catch (errors) {
    console.log(errors)
    return res.status(INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: 'Error',
      error: errors,
    });
  };
};


module.exports = { getBalance, };
