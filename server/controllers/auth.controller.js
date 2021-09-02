/** @format */
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const nodemailer = require("../config/nodemailer.config.js");
const Order = require("./order.controller");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { firstName, lastName, mail, password } = req.body;
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  const token = jwt.sign({ email: mail }, process.env.ACCESS_TOKEN_SECRET);
  const alreadyExistsUser = await User.findOne({
    where: { mail: req.body.mail },
  }).catch((err) => {
    console.log("Error : ", err);
  });
  if (alreadyExistsUser) {
    return res.json({
      message: "User with email already exists !",
    });
  }

  const newUser = await new User({
    firstName,
    lastName,
    mail,
    role: 1,
    password: hashedPassword,
    confirmationCode: token,
  });

  newUser
    .save()
    .then((response) => {
      res.json({ message: "Thanks for registering !" });
      const user = response.dataValues;
      nodemailer.sendConfirmationEmail(user.firstName, user.mail, token);
    })
    .catch((err) => {
      console.log("Error : ", err);
      res.json({
        error: "Cannot register user at the moment!",
      });
    });
};

// exports.checkAuthentication = async (req, res) => {
//   const token = req.params.token;
//   console.log(token)
//   const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
// console.log(decodedToken)
//   const currentUser = await User.findOne({
//     where: { mail: decodedToken.mail }, include : ["addresses"],
//   }).catch((err) => {
//     console.log("Error : ", err);
//   });

//   return res.json(currentUser);
// };

exports.login = async (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password; 
  
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  const userWithEmail = await User.findOne({ where: { mail: mail } }, { include: "commandes"}).catch((err) => {
    console.log("Error: ", err);
  });
  let compare = await bcrypt.compare(password, userWithEmail.password);
  console.log(compare)
  if (!userWithEmail){
    return res.json({
      message: "Adresse mail ou mot de passe erroné.",
    });
  } else if (compare == false) {
    return res.json({
      message: "Adresse mail ou mot de passe erroné.",
    });

  } else if (userWithEmail.status != "active") {
    return res.json({
      message: "Veuillez cliquer sur le lien pour activer votre compte !",
    });
  } else if(compare == true) {
    const accessToken = jwt.sign(
      {
        id: userWithEmail.id,
        mail: userWithEmail.mail,
        role: userWithEmail.role_id
      },
      process.env.ACCESS_TOKEN_SECRET
    );
  
    Order.createBasket(userWithEmail.id);
    res.writeHead(200, {
      "Content-Type": "application/json",
      // "Authorization": req.headers.accessToken,
      // "Set-Cookie": `token=${accessToken}; HttpOnly; path=/`,
      "Set-Cookie": `${accessToken}`,
      "Access-Control-Allow-Credentials": "true",
      "Methods": "GET, PUT, POST, DELETE"
    });
  
    // headers: { Authorization: req.headers.authorization || req.cookies.auth }
    res.write(
      JSON.stringify({
        mail: userWithEmail.mail,
        id: userWithEmail.id,
        firstName: userWithEmail.firstName,
        lastName: userWithEmail.lastName,
        password: userWithEmail.password,
        message: "Welcome Back!",
        token: accessToken,
        role_id: userWithEmail.role_id
      })
    );
  
    res.end();
  }

  
};

exports.confirm = async (req, res) => {
  User.findOne({ confirmationCode: req.params.confirmationCode })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "L'utilisateur n'existe pas" });
      } else {
        user.status = "active";
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
        return res.json(user);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.logout = function (req, res) {
  res.writeHead(200, {
    "Set-Cookie": `token=; HttpOnly; path=/; max-age=0`,
  });
  res.end();
};
