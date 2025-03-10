exports.getLogin = (req, res, next) => {
  {
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAuthenticated: req.isLoggedIn,
    });
  }
};


exports.postLogin = (req, res, next) => {
    res.setHeaders("Set-cookie", "loggedIn=true");
    res.redirect("/"); 
  };