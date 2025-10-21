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
  imageUrl: {
    type: String,
    required: false
  },
  imagekitFileId: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Caption', captionSchema);