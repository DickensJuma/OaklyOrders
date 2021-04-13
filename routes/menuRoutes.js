const express = require("express");
const menuModel = require("../models/menu");
const orderModel = require("../models/order");
var router = express.Router();

//create POST meal
router.post("/menu", async (request, response) => {
  const menu = new menuModel(request.body);

  try {
    await menu.save();
    response.status(200).send({ status: "201", message: "OK", data: menu });
  } catch (error) {
    response.status(500).send(error);
  }
});

//list GET menu
router.get("/menu", async (request, response) => {
  const menu = await menuModel.find({});

  try {
    response.status(200).send({ status: "201", message: "OK", data: menu });
  } catch (error) {
    response.status(500).send(error);
  }
});

//create POST meal
router.post("/orders", async (request, response) => {
  const { menuItemId, userPhoneNumber } = request.body;
  const menu = await menuModel.find({
    menuItemId: menuItemId,
  });

  const orders = new orderModel(request.body);
  console.log(orders);

  try {
    await orders.save();
    response.status(200).send(request.body);
  } catch (error) {
    response.status(500).send(error);
  }
});

//find order on the menu
router.get("/order/:id", async (request, response) => {
  const { id } = request.params;
  const menu = await menuModel.findById(id).populate("order");
  console.log(menu);
  try {
    response.status(200).send(menu);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/incoming-messages", (req, res) => {
  const data = req.body;
  console.log(`Received message: \n ${data}`);
  res.sendStatus(200);
});

// TODO: Delivery reports route
router.post("/delivery-reports", (req, res) => {
  const data = req.body;
  console.log(`Received report: \n ${data}`);
  res.sendStatus(200);
});
module.exports = router;
