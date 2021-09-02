/** @format */

const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const image = require("../controllers/images.controller.js");

router.get("/images", image.findAll);
router.get("/images/component/:name", image.findByComponent);
router.post("/images/create", admin, image.create);
router.put('/images/:id', admin, image.update);
router.delete('/images/:id', admin, image.delete);
router.get("/images/:pId/:role", image.findImgRandom);

module.exports = router;