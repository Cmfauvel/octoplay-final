/** @format */

const express = require("express");
const authApi = require("./auth");
const userApi = require("./users");
const orderApi = require("./order");
const itemApi = require("./item");
const locationApi = require("./location");
const productApi = require("./products");
const categoryApi = require("./categories");
const imageApi = require("./images");
const router = express.Router();

router.use(authApi);
router.use(userApi);
router.use(imageApi);
router.use(productApi);
router.use(locationApi);
router.use(categoryApi);
router.use(orderApi);
router.use(itemApi);

module.exports = router;
