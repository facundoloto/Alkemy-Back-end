const {
  OK,
  ACCEPTED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require('../../constants/httpCodes');
const db = require('../../models');

const getBalance = async (req, res) => {
  let totalEntry=0;
  let totalEgress=0;

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

    if(entry.length!=0){
      entry.map(function(data){
        totalEntry+=data.amount
      })
    }
    if(egress.length!=0){
      egress.map(function(data){
        totalEgress+=data.amount
      })
    }
    
    let amount=totalEntry-totalEgress
    const result={
          "entry":`${totalEntry}`,
          "egress": `${totalEgress}`,
          "balance":`${amount}`
        };
          
        
    
    res.status(OK).json({
      ok: true,
      msg: 'Success',
      balance: result,
    });
  } catch (errors) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: 'Error',
      error: errors,
    });
  };
};

const getBalanceDate= async (req, res) => {
  let totalEntry=0;
  console.log(req.body.date)
  try {
    const entry = await db.Records.findAll({
      attributes: ['amount'],
      where: {
       userId: `${req.body.id}` ,
        typeId: 1,
        date:`${req.body.date}`
      },
    });
console.log(entry)
    if(entry.length!=0){
      entry.map(function(data){
        totalEntry+=data.amount
      })
    }

    const data={
          "entry":`${totalEntry}`,
        };
          
    res.status(OK).json({
      ok: true,
      msg: 'Success',
      balanceDate: data,
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

const getDate= async (req, res) => {
  try {
    const dates = await db.Records.findAll({
      attributes: ['date'],
      where: {
       userId: `${req.params.id}` ,
      },
    });
          
    res.status(OK).json({
      ok: true,
      msg: 'Success',
      results: dates,
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

module.exports = { getBalance, getDate, getBalanceDate };
