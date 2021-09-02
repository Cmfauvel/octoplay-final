/** @format */

const { OrderModel } = require("../models/order.js");
const { Item, Product } = require('../models');
const { Sequelize } = require("sequelize");
const { Order } = require('./order.controller')


exports.createOrderItem = async (req, res) => {
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
// exports.totalAmount = (req, res) => {
//   const orderId = req.params.orderId;
//   //findItems
//   //sumOfItems
//   //update basket with sumOfItems
//   Item.findAll({
//     attributes: [[Sequelize.fn('sum', Sequelize.col('price')), 'total']],
//     group: ['Item.order_id'],
//     where: { order_id: orderId },
//     raw: true,
//     order: Sequelize.literal('total DESC')
//   }).then((response) => {
//     const total = response;
//     res.send(total)
//   })
// }


