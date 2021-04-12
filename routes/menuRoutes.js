const express = require("express");
const menuModel = require("../models/menu");
var router = express.Router()


//create POST meal
router.post("/menu", async (request, response) => {
    const menu = new menuModel(request.body);
  
    try {
      await menu.save();
      response.status(200).send({status:"201",message:"OK",data: menu});
    } catch (error) {
      response.status(500).send(error);
    }
  });

module.exports = router;