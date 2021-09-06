/** @format */

const { OrderModel } = require("../models/order.js");
const { Item, Product, Image } = require('../models');
const { Sequelize } = require("sequelize");
const { Order } = require('./order.controller')


exports.createOrUpdate = async (req, res) => {
  const pId = req.body.ProductId;
  const qty = req.body.qty;
  const orderId = req.params.orderId;
  console.log(req.body)

  const productWanted = await Product.findOne({where: { id: pId}}).catch((err) => {
    console.log("Error : ", err);
  })

  const orderItemAlreadyExists = await Item.findOne({ where: { OrderId: orderId, ProductId: pId}})
    .catch((err) => {
      console.log("Error : ", err);
    })

    if(orderItemAlreadyExists) {
      await Item.update({
      price: orderItemAlreadyExists.price + productWanted.price * qty,
      qty: orderItemAlreadyExists.qty + qty
      }, { where: { id: orderItemAlreadyExists.id}}, {multi: true}).then((resp) => {
        res.send({message: "Item modifié."});
      }).catch((err) => {
        if (err) {
          console.log(err);
          res.send({message: "La modification a échoué."})
        }
      })
    }
  if (!orderItemAlreadyExists) {
    await Item.create({
      ProductId: pId,
      OrderId: orderId,
      price: productWanted.price * qty,
      qty: +qty
    }).then((items) => {
      console.log(items)
      res.send(items)
    })
      .catch((err) => {
        console.log("Error : ", err);
        res.json({
          error: "Cannot register items at the moment!",
        });
      })
  }

}
exports.update = async (req, res) => {
  const orderId = req.params.orderId;
  const newQty = req.body.qty;
  const pId = req.body.ProductId;
  const productWanted = await Product.findOne({where: { id: pId}}).catch((err) => {
    console.log("Error : ", err);
  })
  Item.update({ price: newQty * productWanted.price, qty: newQty},
    { where: { OrderId: orderId } }, { multi: true}).then((count) => {
      console.log(count)
      res.send(count)
    })
      .catch((err) => {
        console.log("Error : ", err);
        res.json({
          error: "La modification a échoué.",
        });
      })
};


exports.findAll = async (req, res) => {

  Item.findAll({ where: { orderId: req.params.orderId}, include:[ { model: Product, include: [{model: Image, as: "images"}]}]}).then((items) => {
    console.log(items)
    res.send(items)
  }).catch((err) => {
    if (err) {
      console.log(err)
      res.send(err)
    }
  })
};

exports.delete = (req, res) => {
  Item.destroy({ where: { id: req.params.id } }).then((resp) => {
    res.send({message: "Item supprimé."})}).catch((err) => {
      if (err) {
        console.log(err);
        res.send({message: "La suppression a échoué."})
      }
    })
};
