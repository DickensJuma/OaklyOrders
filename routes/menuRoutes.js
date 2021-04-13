const express = require("express");
const menuModel = require("../models/menu");
const orderModel = require("../models/order");
var router = express.Router();
const credentials = {
  apiKey: '251e50d776452795fe2930c2089e0e3f6bf222165c0d3f89d058fc88b266d236', 
  username: 'sandbox'     // use 'sandbox' for development in the test environment
};

//sendSMS.JS
const Africastalking = require('africastalking')(credentials);


const sms = Africastalking.SMS

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
  

  
  const orders = new orderModel(request.body);
  // console.log(orders);

  const menu = await menuModel.findById(menuItemId).populate("order");

// Use the service
const options = {
    to: userPhoneNumber,
    message: `Thank you for ordering; ${menu.name}.
     These are now in the oven and will be with you in 45 minutes.`
}


  try {
    await orders.save();
    sms.send(options)
    .then( response => {
        console.log(response);
    })
    .catch( error => {
        console.log(error);
    });
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
