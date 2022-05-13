const validator = require('express-validator');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const usersRouter = require('./routes/users');
const balanceRouter = require('./routes/balanceRoute');
const recordsRouter = require('./routes/recordRoute');
const typeRouter = require('./routes/typeRoute');
const categoriesRouter = require('./routes/categoriesRoute');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.get("/", (req, res) => {
  res.render("index", { titulo: "inicio" });
});

app.use('/auth', usersRouter);
app.use('/balance', balanceRouter);
app.use('/record', recordsRouter);
app.use('/type', typeRouter);
app.use('/categories', categoriesRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {
  app.send("hello")
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  console.log(err)
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
