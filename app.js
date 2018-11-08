// 登入功能參考範例: https://github.com/manjeshpv/node-express-passport-mysql
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var cors = require("cors");
var mysql = require("mysql");

// var hold = require("./middlewares/hold");

//passport
var session = require("express-session");
const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var flash = require("connect-flash");
var isLoggedIn = require("./middlewares/isLoggedIn");

//路由
var indexRouter = require("./routes/index");
var users = require("./tests/users");

//後台路由
var consoleRouter = require("./routes/console/index");
var articleRouter = require("./routes/console/article");
var productRouter = require("./routes/console/product");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "layout",
    extname: ".hbs",
    layoutsDir: "views/layouts"
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//auth
require("./config/passport")(passport); // pass passport for configuration

app.use(
  session({
    secret: "larrykkk",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

app.use("/", indexRouter);
app.use("/users", users);

//後台路由
app.use("/console", consoleRouter);
app.use("/console/article", isLoggedIn, articleRouter);
app.use("/console/product", isLoggedIn, productRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
app.use(function(req, res, next) {
  res.status(404).render("error", {
    layout: "blank",
    title: "Sorry, page not found"
  });
});

// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// app.use(hold);

module.exports = app;
