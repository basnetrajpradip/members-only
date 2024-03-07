const express = require("express");
const router = express.Router();

const message_controller = require("../controller/messageController");
const { hasAdminAuthority } = require("../middleware/authMiddleware");

//Get request for message delete
router.get("/:id", hasAdminAuthority, message_controller.delete_message_get);

//Post request for message delete
router.post("/:id", message_controller.delete_message_post);

module.exports = router;
