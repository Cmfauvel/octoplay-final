/** @format */

const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const orderItem = require("../controllers/orderItem.controller.js");

router.post("/order/:orderId/newItem", auth, orderItem.createOrderItem);
module.exports = router;