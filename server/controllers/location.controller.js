/** @format */

const { Address } = require("../models");

exports.registerAddress = async (req, res) => {
  const {
    num,
    street,
    city,
    zip_code,
    country,
    lastName,
    firstName,
    telephone,
    society_name,
    additionnal_information
  } = req.body;
console.log(req.params)
  const UserId = req.params.userId;
  const newAddress = await new Address({
    num,
    street,
    city,
    zip_code,
    country,
    lastName,
    firstName,
    tel: telephone,
    society_name,
    UserId,
    additionnal_information
  });
  const savedAddress = newAddress
    .save()
    .then((addresses) => {
      console.log(newAddress);
      if (savedAddress) res.json({ message: "Adresse enregistrée." });
    })
    .catch((err) => {
      console.log("Error : ", err);
      res.json({
        message: "L'enregistrement a échoué.",
      });
    });
};

// exports.findAll = (req, res) => {
//   Address.findAll()
//     .then((adresses) => {
//       //findAll({where : {city: ""}})
//       res.send(adresses);
//     })
//     .catch((err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
// };

// exports.findOne = (req, res) => {
 
//   Address.findOne({ where: { id: req.params.id } })
//     .then((adresses) => {
//       res.send(adresses);
//       console.log(req.params.id);
//     })
//     .catch((err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
// };

exports.findByUser = (req, res) => {
    
    Address.findAll({ where: { UserId: req.params.userId } })
      .then((adresses) => {
        res.send(adresses);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  exports.updateAddress = (req, res) => {
    console.log(req.params)
    Address.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      societeName: req.body.societeName,
      num: req.body.num,
      street: req.body.street,
      tel: req.body.telephone,
      additionnal_information: req.body.additionnal_information,
      zip_code: req.body.zip_code,
      city: req.body.city,
      country: req.body.country
    },{where:{id:req.params.id, UserId: req.params.userId}},{multi:true}) 
    .then(() => {res.json({ message: "Adresse modifiée." });})
    .catch((err) => {
      console.log("Error : ", err);
      res.json({
        message: "La modification a échoué.",
      });
    });
  };
  

exports.delete = (req, res) => {
  Address.destroy({ where: { id: req.params.id, UserId: req.params.userId } }).then((resp) => {
    res.send({message: "Adresse supprimée."})}).catch((err) => {
      if (err) {
        console.log(err);
        res.send({message: "La suppression a échoué."})
      }
    })
};
