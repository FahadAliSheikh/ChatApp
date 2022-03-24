const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');

module.exports = {
  saveConversation,
  getUserConversation
}

// async function saveConversation(payload){
//   console.log('payload', payload);
//   let query = {"members":{$all:payload.members}};
//   console.log(query);

//   // const convrsData = {  members: [payload.senderId, payload.receiverId]};

//   // db.collection.replaceOne(query, replacement, {upsert: true})
//   // let query = {$and:}
//   const createdConvers = await Conversation.replaceOne(query , payload, {upsert:true});

//   // const createdConvers = await Conversation.create(payload);
//   console.log(createdConvers);
//   return createdConvers;
// }

async function saveConversation(payload){
  console.log('payload', payload);
  // let query = {"members":{$all:payload.members}};
  // console.log(query);

  // const convrsData = {  members: [payload.senderId, payload.receiverId]};

  // db.collection.replaceOne(query, replacement, {upsert: true})
  // let query = {$and:}
  // const createdConvers = await Conversation.replaceOne(query , payload, {upsert:true});

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
