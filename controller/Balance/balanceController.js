const {
  OK,
  ACCEPTED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require('../../constants/httpCodes');
const db = require('../../models');

const getBalance = async (req, res) => {
  let result = {};
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
    if (entry.length !== 0 && egress.length !== 0) {
      result = { 'entry': entry }
    }
    else {
      result = {
        'entry': entry,
        'egress': egress,
      };
    }
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