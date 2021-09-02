/** @format */

require("dotenv").config();
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const jwt = require("jsonwebtoken");
const cors = require("cors");
const db = require("./models");
const api = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true
  })
);

// app.use(express.static("."));
// const stripe = require("stripe")(
//   "sk_test_51J1v1QEN3lAoYrPWa6GDlASiFZb3PY25Z1Bu5l6ZqXN8t8mvAZ9UZqtJx79OxhTqOBwmtEDr4D0u6YvwzjqJ2mfu00ypHwHDL9"
// );

// calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };
// app.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;
//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "usd",
//   });
//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

app.use("/api/v1", api);

//.sync({ force: true })
db.sequelize.sync().then((req) => {
  app.listen(3000, () => {
    console.log("server running");
  });
});
