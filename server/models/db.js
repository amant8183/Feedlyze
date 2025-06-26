const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user_input: String,
  feedback: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Feedback', feedbackSchema);