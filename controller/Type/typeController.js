const {
    OK,
    ACCEPTED,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
} = require('../../constants/httpCodes');
const db = require('../../models');

const getAllType = async (req, res, next) => {
    try {
        const results = await db.Type.findAll();

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

const getIdType = async (req, res, next) => {

    try {
      const results = await db.Type.findAll({
        where: {
          id: `${req.params.id}`
        }
      }
      );
  
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

module.exports = { getAllType, getIdType };