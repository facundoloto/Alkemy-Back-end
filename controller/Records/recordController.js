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
  };
};

const updateRecord = async (req, res) => {
  const { concept, amount, categoriesId, typeId } = req.body;
  const { id } = req.params;
  try {
    const record = await db.Records.findOne({
      where: { id },
    });
    if (!record) {
      return res.status(HTTP_CODES.NOT_FOUND).json({
        msg: `No se encontro el registro con ID: ${id}`,
      });
    }

    const recordUpdated = await db.Records.update(
      {
        concept,
        typeId,
        amount,
        categoriesId,
      },
      {
        where: {
          id,
        },
      }
    );
    if (!recordUpdated) {
      return res
        .status(HTTP_CODES.NOT_FOUND)
        .send('it can not be updated');
    }
    res.status(HTTP_CODES.OK).send('record updated');
  } catch (error) {
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .send({ msg: 'it happend an error ' });
  }
};

async function deleteRecord(req, res) {
  const { id } = req.params;

  try {
    const deleted = await db.Records.destroy({ where: { id } });
    if (!deleted) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        error: 'record not deleted',
      });
    }
    return res.status(HTTP_CODES.OK).json({
      ok: true,
    });
  } catch (err) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      error: 'record not deleted',
    });
  }
}

const getAllRecords = async (req, res, next) => {
console.log(req.params.id)
  try {
    const record = await db.Records.findAll(
      {
        where: {
          userId: `${req.params.id}`,
        }, 
        include: [
          {
            association: 'type',
            attributes: ['name']
          },
          {
            association: 'categories',
            attributes: ['name']
          },
          {
            association: 'user',
            attributes: ['name']
          }
        ]
      }
    );

    res.status(ACCEPTED).json({
      ok: true,
      msg: 'Succesful request',
      result: record,
    });

  }
  catch (error) {
    console.log(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ ok: false, msg: 'internal server error', error });
  };
};

module.exports = { getAllRecords, addRecord, updateRecord, deleteRecord };
