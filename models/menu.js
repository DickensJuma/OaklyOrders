const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  price: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Negative price aren't real.");
    },
  }
});

const Meal = mongoose.model("Meal", MealSchema);

module.exports = Meal;