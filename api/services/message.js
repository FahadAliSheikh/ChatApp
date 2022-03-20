const repos = require('../repositories');
const { createAccessToken } = require('../helpers/auth');
const bcrypt = require("bcrypt");
const AppError = require('../error/app-error');

module.exports = {
  saveMessage,
  getUserMessage

};


async function saveMessage(payload){
  console.log(payload);
  if(!payload.sender || !payload.conversationId || !payload.text){
    // console.log('usename, email and password are required');
    // req.status(400).json({ message: "usename, email and password are required" });
    throw new AppError('conversationId, sender and text are required!', 400);
  }
  const messageData = {  
    conversationId : payload.conversationId,
    sender : payload.sender,
    text : payload.text,

  }
  const createdData = await  repos.message.saveMessage(messageData);
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

async function getUserMessage(payload){
  console.log(payload);
  if(!payload.conversationId){
    // console.log('usename, email and password are required');
    // req.status(400).json({ message: "usename, email and password are required" });
    throw new AppError('conversationId required!', 400);
  }
  const messageData = await  repos.message.getUserMessage(payload.conversationId);

  if(messageData){
    const returnData = {
      status: 200,
      message: "Messages found!",
      data: {messageData}
    }
    return returnData;
  }else{
   throw new AppError('Sorry, something went wrong!', 503);
  }
}