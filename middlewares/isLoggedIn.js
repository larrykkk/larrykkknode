// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  console.log("oo");
  // res.redirect("http://localhost:3000/console/login");
  res.redirect("./login");
}

module.exports = isLoggedIn;
