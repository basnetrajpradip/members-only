const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Message = require("../models/message");

const log_in_controller = require("../controller/loginController");

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const messages = await Message.find().populate("author").exec();
    if (req.isUnauthenticated()) {
      res.render("index", {
        messages: messages,
      });
    } else {
      res.redirect("/dashboard");
    }
  })
);

module.exports = router;
