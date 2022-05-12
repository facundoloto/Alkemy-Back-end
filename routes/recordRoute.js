const express = require('express');
const router = express.Router();
const {
 addRecord,
 getAllRecords,
 deleteRecord,
 updateRecord,
} = require('../controller/Records/recordController');

/* GET users listing. */
router.get('/:id/',getAllRecords);
router.delete('/:id/',deleteRecord);
router.put('/:id/',updateRecord);
router.post('/add',addRecord);
//router.delete('/:id', deleteUser);

module.exports = router;
