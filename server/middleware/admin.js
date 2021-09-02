/** @format */

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const role = decodedToken.role;
    console.log(decodedToken, role)
    if (role != 2) {
      throw "Cet utilisateur n'a pas les droits";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};