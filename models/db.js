var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "focal"
});

db.connect(function(err) {
  if (err) throw err;
});

module.exports = db;
