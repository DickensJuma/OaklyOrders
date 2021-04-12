const express = require("express");
const mealModel = require("../models/meal");
const app = express();


//create POST meal
app.post("/menu", async (request, response) => {
    const menu = new mealModel(request.body);
  
    try {
      await menu.save();
      response.status(200).send({status:"201",message:"OK",data: menu});
    } catch (error) {
      response.status(500).send(error);
    }
  });

module.exports = app;