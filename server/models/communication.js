// models/CommunicationsLog.js

const mongoose = require('mongoose');

const communicationsLogSchema = new mongoose.Schema({
  criteria: { type: Array, required: true },
  logic: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // Add other fields if needed
});

const CommunicationsLog = mongoose.model('CommunicationsLog', communicationsLogSchema);

module.exports = CommunicationsLog;
