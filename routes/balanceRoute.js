const express = require('express');
const router = express.Router();
const {
 getBalance,
} = require('../controller/Balance/balanceController');

/* GET users listing. */
router.get('/:id',getBalance);;

module.exports = router;
