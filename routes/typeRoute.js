const express = require('express');
const router = express.Router();
const { getAllType } = require('../controller/Type/typeController');

/* GET users listing. */
router.get('/',getAllType);;

module.exports = router;
