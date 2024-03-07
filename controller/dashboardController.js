const asyncHandler = require("express-async-handler");
const Message = require("../models/message");

//Display dashboard page on get
exports.dashboard_get = asyncHandler(async (req, res, next) => {
  const messages = await Message.find().populate("author").exec();
  res.render("dashboard", {
    messages: messages,
    user: req.user,
  });
});
