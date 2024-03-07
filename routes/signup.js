const express = require("express");
const router = express.Router();

const sign_up_controller = require("../controller/signUpController");
const { isAuth } = require("../middleware/authMiddleware");

//Get request for signup page
router.get("/", isAuth, sign_up_controller.sign_up_get);

//Post request for signing up
router.post("/", sign_up_controller.sign_up_post);

module.exports = router;
