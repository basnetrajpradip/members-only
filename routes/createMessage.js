const express = require("express");
const router = express.Router();

const { isUnAuth } = require("../middleware/authMiddleware");
const message_controller = require("../controller/messageController");

//Get request for create message page
router.get("/", isUnAuth, message_controller.create_message_get);

//Post request for create message page
router.post("/", message_controller.create_message_post);

module.exports = router;
