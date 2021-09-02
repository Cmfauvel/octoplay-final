/** @format */

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const user = require("../controllers/users.controller.js");

router.get("/users", user.findAll);

router.get("/users/:userId", auth, user.findOne);

router.get("/users/basicsInfos/:userId", admin, user.findWithBasicsInfos)

// router.get("/users/insert", user.create);

router.delete("/users/delete/:userId", auth, user.delete);

router.put("/user/updatePassword/:userId", user.updatePassword);

router.get("/getMailForNewPassword/:mail", user.getMail);

router.put("/user/:userId", auth, user.update);

module.exports = router;
