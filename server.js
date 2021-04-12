const express = require("express");
const mongoose = require("mongoose");
const mealRouter = require("./models/meal.js")

const app = express();

app.use(express.json());
mongoose.connect(
    "mongodb+srv://dickens:ugPUWKvrnAuiTs8@cluster0.yeyah.mongodb.net/Oaklydb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  );
  


app.listen(3000, () => {
    console.log("Server is running...");
  });