const express = require('express');
const router = express.Router();
const {
 addRecord,
 getAllRecords,
} = require('../controller/Records/recordController');

/* GET users listing. */
router.get('/',getAllRecords);
router.post('/add',addRecord);
//router.delete('/:id', deleteUser);

module.exports = router;
