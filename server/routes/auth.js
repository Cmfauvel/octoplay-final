/** @format */

const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/auth");

const auth = require("../controllers/auth.controller.js");

router.post("/auth/register", auth.register);

router.post("/auth/login", auth.login);

// router.get(
//   "/auth/check-authentication/:token",
//   authMiddleWare,
//   auth.checkAuthentication
// );

router.get("/auth/logout", auth.logout);

router.get("/confirm/:confirmationCode", auth.confirm);

module.exports = router;
