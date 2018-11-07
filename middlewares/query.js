var mysql = require("mysql");
var pool = mysql.createPool({
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "ba3d4254d4f42e",
  password: "28dc64c9",
  database: "heroku_d8b573c814ae11b"
});

var query = function(sql, options, callback) {
  pool.getConnection(function(err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, options, function(err, results, fields) {
        //事件驅動回調
        callback(err, results, fields);
      });
      //釋放連接，需要注意的是連接釋放需要在此處釋放，而不是在查詢回調裡面釋放
      conn.release();
    }
  });
};

module.exports = query;
