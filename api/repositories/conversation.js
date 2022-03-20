const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');

module.exports = {
  saveConversation,
  getUserConversation
}

async function saveConversation(payload){
  const createdConvers = await Conversation.create(payload);
  console.log(createdConvers);
  return createdConvers;
}

async function getUserConversation(payload){
  console.log('inside repo');
  // const newUser = new User(payload);
  console.log(payload);
  const foundConvers = await Conversation.find({members: {$in: [payload]}});
  console.log(foundConvers);
  return foundConvers;
}
