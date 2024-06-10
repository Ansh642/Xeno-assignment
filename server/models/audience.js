const mongoose = require('mongoose');

const audienceSchema = new mongoose.Schema({
  criteria: [
    {
      field: String,
      operator: String,
      value: mongoose.Schema.Types.Mixed,
    }
  ],
  logic: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Audience = mongoose.model('Audience', audienceSchema);

module.exports = Audience;
