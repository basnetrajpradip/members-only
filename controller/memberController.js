const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

//Get request for member validator page
exports.member_validator_get = (req, res, next) => {
  res.render("member", { user: req.user });
};

//Post request for member validator page
exports.member_validator_post = [
  body("memberCode", "Membership Code must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom((value, { req }) => {
      if (value.toUpperCase() !== process.env.MEMBERSHIP_CODE) {
        throw new Error("Membership Code is Invalid.");
      }
      return true;
    }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("member", { user: req.user, code: req.body.memberCode, errors: errors.array() });
      return;
    }
    if (req.body.memberCode.toUpperCase() === process.env.MEMBERSHIP_CODE) {
      await User.findByIdAndUpdate(req.user._id, { isMember: true }, {});
      res.redirect("/");
    }
  }),
];
