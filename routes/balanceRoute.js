const express = require('express');
const router = express.Router();
const {
 getBalance,
getBalanceDate,
getDate,
} = require('../controller/Balance/balanceController');

/* GET users listing. */
router.get('/:id',getBalance);
router.post('/date',getBalanceDate);
router.get('/date/:id',getDate);
module.exports = router;
