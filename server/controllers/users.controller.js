/** @format */

const { User } = require("../models");
const address = require("../models/address");
const nodemailer = require("../config/nodemailer.config");
const { user } = require("../config/auth.config");
const bcrypt = require("bcryptjs");

exports.findAll = (req, res) => {
  User.findAll()
    .then((users) => {
      //findAll({where : {firstName: ""}})
      res.send(users);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.findOne = (req, res) => {
  User.findOne({ where: { id: req.params.userId }, include: ["addresses"] })
    .then((users) => {
      res.send(users);
      console.log(req.params.userId);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.findWithBasicsInfos = (req, res) => {
  User.findOne({ where: { id: req.params.userId }, attributes: ["lastName", "firstName", "mail"] })
    .then((users) => {
      res.send(users);
      console.log(req.params.userId);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

// exports.findUserByMail = (req, res) => {
//   // `/users/?UserId=${User.id}`
//   console.log(req.params.mail)
//   const user = User.findOne({ where: { mail: req.params.mail }, include: ["addresses"] })
//     // .then((users) => {
//     //   res.send(users);
//     //   console.log(req.params.mail);
//     // })
//     .catch((err) => {
//       if (err) {
//         console.log(err);
//       }
//     })
//   console.log('user : ', user)
// };

// exports.create = (req, res) => {
//   User.create({
//     firstName: "Pedro",
//     lastName: "Doe",
//     mail: "pedro@gmail.com",
//   }).catch((err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
//   res.send("insert");
// };


exports.updatePassword = async (req, res) => {
  const password = await req.body.password;
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  if(password != req.body.repeatPassword){
    res.send({ message: "La modification a échoué." });
  }
  await User.update({
    password: hashedPassword
  }, { where: { id: req.params.userId } }, { multi: true }).then(
    () => {
      res.send({ message: "Votre mot de passe a été modifié." });
    }
  ).catch((err) => {
    if (err) {
      console.log(err)
    }
  });
  User.findOne({ where: { id: req.params.userId } })
    .then((user) => {
      nodemailer.sendConfirmationEmailPassword(user.firstName, user.mail);
    }).catch((err) => {
      console.log("Error : ", err);
    });
}



exports.update = (req, res) => {
  User.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mail: req.body.mail
  }, {
    where: { id: req.params.userId }
  }, {
    multi: true
  }).then((nbUserUpdated) => {
    let response = nbUserUpdated[0] + ' utilisateur modifié.'
    res.json({ message: "Vos modifications ont été enregistrées." })
  }).catch((err) => {
    res.json({ message: "VLa modification a échoué.", error: err })
  })
}

exports.getMail = (req, res) => {
  const mail = req.params.mail;
  // const nb = req.body.nb;
  console.log(mail)
  User.findOne({ where: { mail: mail} }).catch((err) => {
    console.log("Error : ", err);
  }).then(user => {
    const nb = Math.floor(Math.random() * 9999) + 1001;

    nodemailer.getNewPassword(user.mail, user.firstName, nb)
    // console.log('nb :', nb);
    // console.log(user);
    response = { user, nb }
    res.send(response);
  })


}

exports.delete = (req, res) => {
  User.destroy({ where: { id: req.params.userId } }).then((resp) => {
    res.send({message: "Utilisateur supprimé."})}).catch((err) => {
      if (err) {
        console.log(err);
        res.send({message: "La suppression a échoué."})
      }
    })
};
