const User = require("../models/user");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

//Display login form on Get
exports.log_in_get = (req, res, next) => {
  res.render("log_in");
};

//Handle login on Post

//Default Authentication
/* exports.log_in_post = [
  body("username", "User Name must not be empty").trim().isLength({ min: 1 }).escape(),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
];
 */

//Customized authentication
exports.log_in_post = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.session.messages = [info.message];
      res.render("log_in", { errors: req.session.messages ? req.session.messages[req.session.messages.length - 1] : "" });
      return;
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};
