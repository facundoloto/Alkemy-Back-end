const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../controller/Categories/categoriesController');

/* GET users listing. */
router.get('/',getAllCategories);;

module.exports = router;
