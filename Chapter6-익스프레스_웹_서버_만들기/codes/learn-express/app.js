var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // 2019-04-21 빠진 부분 추가
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup // 이미 있네?
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

// app.use(function(req,res,next){
//   console.log(req.url, '저도 미들웨어입니다.');
//  next();
// }); 


app.use(logger('dev'));
//app.use(logger('short'));
//app.use(logger('common'));
//app.use(logger('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret code'));
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: 'secret code',
    cookie: {
      httpOnly: true,
      secure: false,
    }
}));
app.use(flash());

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
