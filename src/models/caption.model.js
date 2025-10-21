const mongoose = require('mongoose');

const captionSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true
  },
  imageHash: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Caption', captionSchema);