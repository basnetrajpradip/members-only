const express = require("express");
const router = express.Router();

const log_in_controller = require("../controller/loginController");
const { isAuth } = require("../middleware/authMiddleware");

//Get request for login page
router.get("/", isAuth, log_in_controller.log_in_get);

//Post request for logging up
router.post("/", log_in_controller.log_in_post);

module.exports = router;
