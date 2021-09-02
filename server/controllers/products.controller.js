/** @format */

const { Product } = require("../models");
const { Category } = require("../models");
const { Image } = require("../models");

exports.findAll = (req, res) => {
  Product.findAll({
    include: ["images"],
  })
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.findOne = (req, res) => {
  Product.findOne({ where: { id: req.params.id }, include: ["images"] })
    .then((products) => {
      res.send(products);
      console.log(req.params.id);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};


exports.findAll = (req, res) => {
  Product.findAll({ include: ["images"] })
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.create = (req, res) => {
  Product.create({
    description: req.body.description,
    name: req.body.name,
    stock: req.body.stock,
    utilisation: req.body.utilisation,
    fabrication: req.body.fabrication,
    price: req.body.price,
    CategoryId: req.body.cat
  }).then((resp) => {
    console.log(resp)
    res.send({message: "Produit ajouté."});
  }).catch((err) => {
    if (err) {
      console.log(err);
      res.send({message: "L'ajout à la base de données a échoué."})
    }
  });
};

exports.update = (req, res) => {
  Product.update({
    description: req.body.description,
    name: req.body.name,
    stock: req.body.stock,
    utilisation: req.body.utilisation,
    fabrication: req.body.fabrication,
    price: req.body.price,
    CategoryId: req.body.cat
  }, { where: { id: req.params.id}}, {multi: true}).then((resp) => {
    res.send({message: "Produit modifié."});
  }).catch((err) => {
    if (err) {
      console.log(err);
      res.send({message: "La modification a échoué."})
    }
  })
};

exports.delete = (req, res) => {
  Product.destroy({ where: { id: req.params.id } }).then((resp) => {
    res.send({message: "Produit supprimé."})}).catch((err) => {
      if (err) {
        console.log(err);
        res.send({message: "La suppression a échoué."})
      }
    })
};
