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


module.exports = { getBalance, };

/*
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
*/