/** @format */

const express = require("express");
const router = express.Router();

const product = require("../controllers/products.controller.js");
const admin = require("../middleware/admin");


router.get("/products", product.findAll);
router.post("/products/insert", admin, product.create);
router.put("/products/:id", admin, product.update);
router.delete("/products/:id", admin, product.delete);
router.get("/products/:id", product.findOne);
module.exports = router;
