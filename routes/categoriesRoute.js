const express = require('express');
const router = express.Router();
const { getAllCategories, getIdCategories } = require('../controller/Categories/categoriesController');

/* GET users listing. */
router.get('/',getAllCategories);;
router.get('/:id/',getIdCategories);
module.exports = router;
