const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  totalSpends: Number,
  visits: Number,
  lastVist : String
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
