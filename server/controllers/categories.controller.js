/** @format */

const { Category } = require("../models");

exports.findAll = (req, res) => {
  Category.findAll()
    .then((categories) => {
      //findAll({where : {firstName: ""}})
      res.send(categories);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.findOne = (req, res) => {
  // `/categories/?CategoryId=${Category.id}`
  Category.findAll({ where: { id: req.params.id } })
    .then((categories) => {
      res.send(categories);
      console.log(req.params.id);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.create = (req, res) => {
  Category.create({
    code_cat: req.body.code,
    name_cat: req.body.name
  }).then((resp) => {
    console.log(resp)
    res.send({message: "Catégorie ajoutée."});
  }).catch((err) => {
    if (err) {
      console.log(err);
      res.send({message: "L'ajout à la base de données a échoué."})
    }
  });
};

exports.update = (req, res) => {
  Category.update({
    code_cat: req.body.code,
    name_cat: req.body.name
  }, { where: { id: req.params.id}}, {multi: true}).then((resp) => {
    res.send({message: "Catégorie modifiée."});
  }).catch((err) => {
    if (err) {
      console.log(err);
      res.send({message: "La modification a échoué."})
    }
  })
};

exports.delete = (req, res) => {
  Category.destroy({ where: { id: req.params.id } }).then((resp) => {
    res.send({message: "Catégorie supprimée."})}).catch((err) => {
      if (err) {
        console.log(err);
        res.send({message: "La suppression a échoué."})
      }
    })
};
