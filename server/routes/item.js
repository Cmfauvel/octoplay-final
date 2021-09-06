/** @format */

const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const orderItem = require("../controllers/orderItem.controller.js");

router.post("/order/:orderId/newItem", auth, orderItem.createOrUpdate);
router.put("/order/:orderId/newItem", auth, orderItem.update);
router.get("/order/:orderId/items", orderItem.findAll);
router.delete('/order/:id', admin, orderItem.delete);
module.exports = router;