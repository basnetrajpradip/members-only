const User = require("../models/user");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//Display sign up form on Get
exports.sign_up_get = (req, res, next) => {
  res.render("sign_up");
};

//Handle sign up on Post
exports.sign_up_post = [
  body("firstname", "First Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("lastname", "Last name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("username", "User name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").escape(),
  body("confirmPassword")
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash password using bcryptjss
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: hashedPassword,
    });
    if (!errors.isEmpty()) {
      res.render("sign_up", {
        user: user,
        errors: errors.array(),
      });
      return;
    } else {
      await user.save();
      // Redirect indicating successful sign-up
      res.redirect("/log-in");
    }
  }),
];
