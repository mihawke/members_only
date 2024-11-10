const mongoose = require('mongoose');

// Define the message schema
const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
    ref: 'User',  // Points to the User model
    required: true
  }
});

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
