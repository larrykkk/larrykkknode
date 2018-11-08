var express = require("express");
var router = express.Router();

var db = require("../models/db");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// /* GET home page. */
router.get("/", function(req, res, next) {
  res.redirect("http://localhost:3000/console/login");
});

module.exports = router;
