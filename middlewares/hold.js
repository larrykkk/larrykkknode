var mysql = require("mysql");
var pool = mysql.createPool({
  host: "your host",
  user: "your account",
  password: "your password",
  database: "your database",
  connectionLimit: 10 // 可以自己設定
});

var query = function(sql, options, callback) {
  console.log(sql, options, callback);
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }
  pool.getConnection(function(err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, options, function(err, results, fields) {
        // callback
        callback(err, results, fields);
      });
      // release connection。
      // 要注意的是，connection 的釋放需要在此 release，而不能在 callback 中 release
      conn.release();
    }
  });
};

module.exports = query;
