const express = require('express');
const router = express.Router();
const {
  authUser,
  deleteUser,
  signUp,
} = require('../controller/Login/loginController');

/* GET users listing. */
router.post('/login', authUser);
router.post('/register',signUp);
router.delete('/:id', deleteUser);

module.exports = router;
