const express = require("express");
const router = express.Router();

const member_controller = require("../controller/memberController");
const { isMember } = require("../middleware/authMiddleware");

//Get request for member validator page
router.get("/", isMember, member_controller.member_validator_get);

//Post request for member validator page
router.post("/", member_controller.member_validator_post);

module.exports = router;
