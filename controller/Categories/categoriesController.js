const {
    OK,
    ACCEPTED,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
  } = require('../../constants/httpCodes');
  const db = require('../../models');

  const getAllCategories = async (req, res, next) => {

    try {
      const results = await db.Categories.findAll();
  
      res.status(ACCEPTED).json({
        ok: true,
        msg: 'Succesful request',
        result: results,
      });
  
    }
    catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ ok: false, msg: 'internal server error', error });
    };
  };
  
  module.exports = { getAllCategories };