const express = require('express');
const router = express.Router();
const { getAllType, getIdType } = require('../controller/Type/typeController');

/* GET users listing. */
router.get('/',getAllType);;
router.get('/:id/',getIdType);

module.exports = router;
