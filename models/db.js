var mysql = require("mysql");
var db = mysql.createConnection({
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "ba3d4254d4f42e",
  password: "28dc64c9",
  database: "heroku_d8b573c814ae11b"
  // port: "3306"
});

// db.connect(function(err) {
//   if (err) throw err;
// });

// 連接數據庫
function connect() {
  db.connect(handleError);
  db.on("error", handleError);
}

function handleError(err) {
  if (err) {
    // 如果是連接斷開，自動重新連接
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      connect();
    } else {
      console.error(err.stack || err);
    }
  }
}

connect();

module.exports = db;
