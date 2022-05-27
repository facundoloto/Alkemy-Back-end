const express = require('express');
const router = express.Router();
const {
 getBalance,
getDate,
} = require('../controller/Balance/balanceController');

/* GET users listing. */
router.get('/:id',getBalance);
router.get('/date/:id',getDate);
module.exports = router;
