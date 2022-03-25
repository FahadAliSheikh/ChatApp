const repos = require('../repositories');
const { createAccessToken } = require('../helpers/auth');
const bcrypt = require("bcrypt");
const AppError = require('../error/app-error');

module.exports = {
  saveMessage,
  getConverMessages

};


async function saveMessage(payload){
  if(!payload.senderId || !payload.receiverId || !payload.text){
    throw new AppError('senderId, receiverId and text are required!', 400);
  }
  const messageData = {  
    senderId : payload.senderId,
    receiverId : payload.receiverId,
    members: [payload.senderId,payload.receiverId],
    text : payload.text,

  }
  const createdData = await  repos.message.saveMessage(messageData);
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


async function getConverMessages(payload){
  if(!payload.senderId || !payload.receiverId){
    throw new AppError('senderId and receiverId required!', 400);
  }
  const messageData = await  repos.message.getConverMessages(payload);

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