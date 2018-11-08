var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "ba3d4254d4f42e",
  password: "28dc64c9",
  database: "heroku_d8b573c814ae11b"
});

module.exports = pool;

// pool.query("SELECT 1 + 1 AS solution", function(error, results, fields) {
//   if (error) throw error;
//   console.log("The solution is: ", results[0].solution);
// });

// pool.getConnection(function(err, con) {
//   if (err) throw err; // not connected!

//   // Use the connection
//   con.query("SELECT * FROM user", function(error, results, fields) {
//     // When done with the connection, release it.
//     console.log(results);
//     con.release();

//     // Handle error after the release.
//     if (error) throw error;

//     // Don't use the connection here, it has been returned to the pool.
//   });
// });
