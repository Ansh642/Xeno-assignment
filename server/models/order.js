const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type  :mongoose.Schema.Types.ObjectId,
    ref : "Customer"
  },
  amount: Number,
  date: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
