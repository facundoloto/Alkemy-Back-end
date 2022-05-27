const {
  OK,
  ACCEPTED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("../../constants/httpCodes");
const db = require("../../models");

const getBalance = async (req, res) => {
  let totalEntry = 0;
  let totalEgress = 0;

  try {
    const entry = await db.Records.findAll({
      attributes: ["amount"],
      where: {
        typeId: 1,
        userId: `${req.params.id}`,
      },
    });

    const egress = await db.Records.findAll({
      attributes: ["amount"],
      where: {
        typeId: 2,
        userId: `${req.params.id}`,
      },
    });

    if (entry.length != 0) {
      entry.map(function (data) {
        totalEntry += data.amount;
      });
    }

    if (egress.length != 0) {
      egress.map(function (data) {
        totalEgress += data.amount;
      });
    }

    let amount = totalEntry - totalEgress;

    const result = {
      entry: `${totalEntry}`,
      egress: `${totalEgress}`,
      balance: `${amount}`,
    };

    res.status(OK).json({
      ok: true,
      msg: "Success",
      balance: result,
    });

  } catch (errors) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Error",
      error: errors,
    });
  }
};

const getDate = async (req, res) => {
  let arr = [];

  try {
    const dates = await db.Records.findAll({
      attributes: ["date"],
      where: {
        userId: `${req.params.id}`,
      },
    });

    let result = dates.filter((item, index) => {
      //filtra fechas repetidas
      return dates.indexOf(item) === index;
    });

    result.map(async (item) => {
      let totalEntry = 0;

      const entry = await db.Records.findAll({
        attributes: ["amount"],
        where: {
          userId: `${req.params.id}`,
          typeId: 1,
          date: `${item.date}`,
        },
      });

      if (entry.length != 0) {
        await entry.map(function (data) {
          totalEntry += data.amount;
          let date = { date: item.date, balance: totalEntry };
          arr.push(date);
          console.log(arr);
        });
      }
    });

    setTimeout(function () {
      res.status(OK).json({
        ok: true,
        msg: "Success",
        balanceDate: arr,
      });
    }, 2200);

  } catch (errors) {

    console.log(errors);
    return res.status(INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Error",
      error: errors,
    });

  }
};

module.exports = { getBalance, getDate };
