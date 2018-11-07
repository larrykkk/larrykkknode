var express = require("express");
var router = express.Router();

var db = require("../models/db");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// /* GET home page. */
// router.get("/", function(req, res, next) {
//   res.render("practice", { title: "Express" });
// });

module.exports = router;
