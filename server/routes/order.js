/** @format */

const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const order = require("../controllers/order.controller.js");
const orderItem = require("../controllers/orderItem.controller.js");

router.post("/user/:userId/order", auth, order.createBasket);
router.get("/user/:userId/order", auth, order.getBasket);
router.get("/orders", order.findAll);
router.put("/user/:userId/order/:id", auth, order.addAddress);
router.put("/user/:userId/order/total/:orderId", auth, order.updateTotalPrice);
module.exports = router;