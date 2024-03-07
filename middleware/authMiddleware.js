exports.isUnAuth = (req, res, next) => {
  if (req.isUnauthenticated()) {
    res.redirect("/log-in");
  } else {
    next();
  }
};

exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

exports.isMember = (req, res, next) => {
  if (req.isUnauthenticated()) {
    res.redirect("/log-in");
  } else if (req.user.isMember) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.isUnauthenticated()) {
    res.redirect("/log-in");
  } else if (req.user.isAdmin) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

exports.hasAdminAuthority = (req, res, next) => {
  if (req.isUnauthenticated()) {
    res.redirect("/log-in");
  } else if ((req.user.isMember && !req.user.isAdmin) || !req.user.isMember) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};
