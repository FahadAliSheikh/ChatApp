const repos = require('../repositories');
const { createAccessToken } = require('../helpers/auth');
const bcrypt = require("bcrypt");
const AppError = require('../error/app-error');

module.exports = {
  saveConversation,
  getUserConversation
};


async function saveConversation(payload){
  console.log(payload);
  if(!payload.senderId || !payload.receiverId){
    // console.log('usename, email and password are required');
    // req.status(400).json({ message: "usename, email and password are required" });
    throw new AppError('senderId and userId required!', 400);
  }
  const convrsData = {  members: [payload.senderId, payload.receiverId]}
  const createdData = await  repos.conversation.saveConversation(convrsData);
  console.log(createdData);
  if(createdData){
    const returnData = {
      status: 200,
      message: "user has been created!",
      data: {createdData}
    }
    return returnData;
  }else{
   throw new AppError('Sorry, something went wrong!', 503);
  }
  
}

async function getUserConversation(payload){
  console.log(payload);
  if(!payload.userId){
    // console.log('usename, email and password are required');
    // req.status(400).json({ message: "usename, email and password are required" });
    throw new AppError('userId required!', 400);
  }
  const conversData = await  repos.conversation.getUserConversation(payload.userId);

  if(conversData){
    const returnData = {
      status: 200,
      message: "Conversations found!",
      data: {conversData}
    }
    return returnData;
  }else{
   throw new AppError('Sorry, something went wrong!', 503);
  }
}