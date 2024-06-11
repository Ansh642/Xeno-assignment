// models/message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  content: String,
  status: {
    type: String,
    enum: ['SENT', 'FAILED'],
    default: 'SENT'
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
