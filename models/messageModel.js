const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageModel = mongoose.model('Message', new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    author: { type: mongoose.Types.ObjectId, ref: "User" }
  }));

module.exports = MessageModel