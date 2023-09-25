var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var hotelsRouter = require('./routes/hotels');
var usersRouter = require('./routes/users');

// const indexRouter = require('./routes/index');
const hotelsRouter = require('./routes/hotels');
// const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');

const attractionsRouter = require('./routes/attractions');
const housesRouter = require('./routes/houses');

var app = express();

const cors = require('cors');
// Configure CORS options
// const corsOptions = {
//   origin: 'http://localhost:5173', // Allow requests only from this origin
// };

// Enable CORS with the specified options
app.use(cors());

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './databases/booking.db',
});
const User = require('./models/user');
const Room = require('./models/rooms');
const Hotel = require('./models/hotels');
const House = require('./models/house');
const Attraction = require('./models/attraction');

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/hotels', hotelsRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
// app.use('/attractions', attractionsRouter);
app.use('/houses', housesRouter);
app.use('/attract', attractionsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
