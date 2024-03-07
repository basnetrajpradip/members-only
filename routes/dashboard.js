const express = require("express");
const router = express.Router();

const dashboard_controller = require("../controller/dashboardController");
const { isUnAuth } = require("../middleware/authMiddleware");

//Get request for dashboard page
router.get("/", isUnAuth, dashboard_controller.dashboard_get);

module.exports = router;
