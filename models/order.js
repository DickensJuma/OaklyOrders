const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal'
  },
  userPhoneNumber: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;