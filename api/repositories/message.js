const mongoose = require('mongoose');
const Message = require('../models/Message');

module.exports = {
  saveMessage,
  getConverMessages
}

async function saveMessage(payload){
  const createdMessage = await Message.create(payload);
  return createdMessage;
}

async function getConverMessages(payload){
  const foundMessages = await Message.find({members: {$all:[payload.senderId, payload.receiverId]}});
  return foundMessages;
}