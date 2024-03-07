const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Message = require("../models/message");

//Display create message page on Get
exports.create_message_get = (req, res, next) => {
  res.render("message_form", { user: req.user });
};

//Handle create message on Post
exports.create_message_post = [
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("message", "Message must not be empty").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      author: req.user._id,
      title: req.body.title,
      message: req.body.message,
    });

    if (!errors.isEmpty()) {
      res.render("message_form", {
        message: message,
        errors: errors.array(),
      });
      return;
    } else {
      await message.save();
      console.log("message save vayo");
      res.redirect("/");
    }
  }),
];

//Display delete message page on Get
exports.delete_message_get = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id).populate("author").exec();
  res.render("message_delete", { message: message, user: req.user });
});

//Handle delete message on Post
exports.delete_message_post = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.body.messageid);
  res.redirect("/");
});
