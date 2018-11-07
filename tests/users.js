var express = require("express");
var users = express.Router();
var db = require("../models/db");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var token;

/* GET users listing. */
users.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

users.use(cors());
process.env.SECRET_KEY = "devesh";

users.post("/register", function(req, res) {
  console.log("123");
  var today = new Date();
  var appData = {
    "error ": 1,
    data: ""
  };
  var userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  };

  console.log(userData);
  db.query("INSERT INTO users SET ? ", userData, function(err, rows, fields) {
    // console.log(fields);
    if (!err) {
      appData.error = 0;
      appData["data"] = "User registered successfully!";
      res.status(201).json(appData);
    } else {
      console.log(err);
      appData["data"] = "Error Occured!";
      res.status(400).json(appData);
    }
  });
});

users.post("/login", function(req, res) {
  var appData = {};
  var email = req.body.email;
  var password = req.body.password;
  db.query("SELECT * FROM users WHERE email = ?", [email], function(
    err,
    rows,
    fileds
  ) {
    if (err) {
      console.log(err);
    }
    if (rows.length > 0) {
      if (rows[0].password == password) {
        token = jwt.sign(
          JSON.parse(JSON.stringify(rows[0])),
          process.env.SECRET_KEY,
          {
            expiresIn: 5000
          }
        );
        appData.error = 0;
        appData["token"] = token;
        res.status(200).json(appData);
      } else {
        appData.error = 1;
        appData["data"] = "Email and Password does not match";
        res.status(204).json(appData);
      }
    } else {
      appData.error = 1;
      appData["data"] = "Email does not exists!";
      res.status(204).json(appData);
    }
  });
});

users.use(function(req, res, next) {
  var token = req.body.token || req.headers["token"];
  var appData = {};
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function(err) {
      if (err) {
        appData["error"] = 1;
        appData["data"] = "Token is invalid";
        res.status(500).json(appData);
      } else {
        // console.log(process);
        // console.log("larrylarrylarrylarrylarrylarrylarry");
        // console.log(process.env);
        console.log("next");
        next();
      }
    });
  } else {
    appData["error"] = 1;
    appData["data"] = "Please send a token";
    res.status(403).json(appData);
  }
});

users.get("/getUsers", function(req, res) {
  var token = req.body.token || req.headers["token"];
  var appData = {};
  db.query("SELECT * FROM users", function(err, rows, fields) {
    if (!err) {
      appData["error"] = 0;
      appData["data"] = rows;
      res.status(200).json(appData);
      console.log(appData);
    } else {
      appData["data"] = "No data found";
      res.status(204).json(appData);
      console.log(appData);
      // test
    }
  });
});

module.exports = users;
