const express = require("express");
const router = express.Router();

const admin_controller = require("../controller/adminController");
const { isAdmin } = require("../middleware/authMiddleware");

//Get request for admin validator page
router.get("/", isAdmin, admin_controller.admin_validator_get);

//Post request for admin validator page
router.post("/", admin_controller.admin_validator_post);

module.exports = router;
