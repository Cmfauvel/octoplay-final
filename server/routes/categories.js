/** @format */

const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const Category = require("../controllers/categories.controller.js");

router.get("/categories", Category.findAll);
router.get(`/categories/:id`, Category.findOne);
router.post("/categories/insert", admin, Category.create);
router.put("/categories/:id", admin, Category.update);
router.delete("/categories/:id", admin, Category.delete);


module.exports = router;