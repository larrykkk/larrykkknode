var express = require("express");
var exphbs = require("express-handlebars");
var router = express.Router();
var app = express();
var db = require("../../models/db");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var formidable = require("formidable");
const passport = require("passport");
var isLoggedIn = require("../../middlewares/isLoggedIn");

app.engine(
  "exphbs",
  exphbs({
    defaultLayout: "layout",
    extname: ".hbs",
    layoutsDir: "views/layouts"
  })
);

/* GET home page. */
router.get("/", isLoggedIn, function(req, res, next) {
  res.render("console/index", { title: "Express" });
});

router.get("/register", function(req, res, next) {
  res.render("console/user/register", {
    layout: "blank"
  });
});

router.get("/login", function(req, res, next) {
  res.render("console/user/login", {
    layout: "blank"
  });
});

router.post(
  "/register",
  passport.authenticate("local-signup", {
    successRedirect: "./login", // redirect to the secure profile section
    failureRedirect: "./register", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }),
  function(req, res) {
    console.log("register");
    res.redirect("/");
  }
);

router.post(
  "/login",
  passport.authenticate("local-login", {
    // successRedirect: "./", // redirect to the secure profile section
    failureRedirect: "./login", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }),
  function(req, res) {
    var user = req.body.username;
    console.log(user + " login at " + new Date());
    res.render("console", { isLogin: false, title: "Hi!," + user + " 歡迎" , username: user});
  }
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("./");
});

module.exports = router;
