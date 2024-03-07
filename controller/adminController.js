const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

//Get request for admin validator page
exports.admin_validator_get = (req, res, next) => {
  res.render("admin", { user: req.user });
};

//Post request for admin validator page
exports.admin_validator_post = [
  body("adminCode", "Admin Authority Code must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom((value, { req }) => {
      if (value.toUpperCase() !== process.env.ADMIN_CODE) {
        throw new Error("Admin Authority Code is Invalid.");
      }
      return true;
    }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("admin", { user: req.user, code: req.body.adminCode, errors: errors.array() });
      return;
    }
    if (req.body.adminCode.toUpperCase() === process.env.ADMIN_CODE) {
      await User.findByIdAndUpdate(req.user._id, { isMember: true, isAdmin: true }, {});
      res.redirect("/");
    }
  }),
];
