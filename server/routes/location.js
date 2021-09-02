/** @format */

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const location = require("../controllers/location.controller.js");

router.post("/user/:userId/location", auth, location.registerAddress);
router.get(`/user/:userId/locations`, auth, location.findByUser);
router.delete("/user/:userId/location/:id", auth, location.delete);
router.put("/user/:userId/location/:id", auth, location.updateAddress);
module.exports = router;
