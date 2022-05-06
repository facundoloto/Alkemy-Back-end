const { validationResult } = require('express-validator');
const {
  OK,
  ACCEPTED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require('../../constants/httpCodes');
const db = require('../../models');

const addRecord = async (req, res) => {
  const { categoriesId, typeId, amount, concept, date, userId } = req.body;
  try {
    const newRecord = await db.Records.create({
      concept,
      typeId,
      amount,
      categoriesId,
      date,
      userId,
    });
    res.status(OK).json({
      ok: true,
      msg: 'Success creating new record',
      result: newRecord,
    });
  } catch (errors) {
    console.log(errors)
    return res.status(INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: 'Error creating contact.',
      error: errors,
    });
  }
};

const getAllRecords = async (req, res, next) => {
  try {
    const record = await db.Records.findAll();
    res.status(ACCEPTED).json({
      ok: true,
      msg: 'Succesful request',
      result: record,
    });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ ok: false, msg: 'internal server error', error });
  }
};

module.exports = { getAllRecords, addRecord };
