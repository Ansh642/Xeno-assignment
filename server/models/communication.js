const mongoose = require('mongoose');

const communicationsLogSchema = new mongoose.Schema({
  criteria: [
    {
      field: String,
      operator: String,
      value: String,
    },
  ],
  logic: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CommunicationsLog = mongoose.model('CommunicationsLog', communicationsLogSchema);

module.exports = CommunicationsLog;
