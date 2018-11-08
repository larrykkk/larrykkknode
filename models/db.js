var mysql = require("mysql");
var db = mysql.createConnection({
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "ba3d4254d4f42e",
  password: "28dc64c9",
  database: "heroku_d8b573c814ae11b"
  // port: "3306"
});

db.connect(function(err) {
  if (err) throw err;
});

module.exports = db;
