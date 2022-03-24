const mongoose = require('mongoose');
const Message = require('../models/Message');

module.exports = {
  saveMessage,
  getUserMessage,
  getConverMessages
}

async function saveMessage(payload){
  const createdMessage = await Message.create(payload);
  console.log(createdMessage);
  return createdMessage;
}

async function getUserMessage(payload){
  console.log('inside repo');
  // const newUser = new User(payload);
  console.log(payload);
  const foundMessages = await Message.find({conversationId : payload});
  console.log(foundMessages);
  return foundMessages;
}


async function getConverMessages(payload){
  // const newUser = new User(payload);
  console.log(payload);
  const foundMessages = await Message.find({members: {$all:[payload.senderId, payload.receiverId]}});
  console.log(foundMessages);
  return foundMessages;
}