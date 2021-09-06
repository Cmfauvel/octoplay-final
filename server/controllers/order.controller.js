/** @format */

const { Order } = require("../models");
const { Item } = require("../models");
const { Product } = require("../models");
const { User } = require("../models");
const { Address } = require("../models");


exports.createBasket = async (userId) => {

  const alreadyExistsOrder = await Order.findOne({
    where: { user_id: userId,  status: "waiting"},
  }).catch((err) => {
    console.log("Error : ", err);
  });
  if (!alreadyExistsOrder) {
    console.log("l'utilisateur est :", userId)
   const newOrder = await Order.create({
      status: "waiting",
      user_id: userId
    }).then((resp) =>
    {console.log(resp)}
    )
      .catch((err) => {
        console.log("Error : ", err);
      });
  }
};

exports.updateTotalPrice = async (req, res) => {
    const orderId = req.params.orderId;
      const totalHt = await Item.sum('price', {
    where: {OrderId: orderId}
  }).catch((err) => {
    console.log("Error : ", err);
  });
  const totalTtc = totalHt + totalHt * 0.2;
  await Order.update({ price: totalHt, total_price: totalTtc, delivry_cost: 3.5},
    { where: { id: orderId } }, { multi: true}).then((order) => {
      res.send({message : "Commande mise à jour."});
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
}

exports.findAll = async (req, res) => {

  Order.findAll({ include:[ { model: Address, as: "address"},
  { model: Item, as: "items"},
  { model: User, as: "user", attributes: ["lastName", "firstName", "mail"]}
  ]}).then((orders) => {
    console.log(orders)
    res.send(orders)
  }).catch((err) => {
    if (err) {
      console.log(err)
      res.send(err)
    }
  })
}

exports.addAddress = (req, res) => {
  const addressId = req.body.addressId;
  const id = req.params.id;
  console.log(req.body)
  Order.update({
    address_id: addressId
  },
  {where: { id: id}}, { multi: true}).then((count) => {
    console.log(count)
    res.send({message : "Commande mise à jour : adresse de livraison ajoutée."});
  })
  .catch((err) => {
    if (err) {
      console.log(err)
      res.send({message: "L'ajout d'adresse a échoué."})
    }
  });
}

exports.getBasket = (req, res) => {
  const userId = req.params.userId
  Order.findOne({
    where: { user_id: userId }, include: ["items"]
  }).then((order) => {
    res.send(order)
  })
}
