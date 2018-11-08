var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "ba3d4254d4f42e",
  password: "28dc64c9",
  database: "heroku_d8b573c814ae11b"
});

module.exports = pool;
