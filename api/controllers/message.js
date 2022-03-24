const services = require('../services');

module.exports = {
  saveMessage,
  getUserMessage,
  getConverMessages
};


function saveMessage(req, res, next){

  let payload = {
    conversationId: req.body.conversationId,
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    sender: req.body.sender,
    text:req.body.text
    };
  return services.message.saveMessage(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function getUserMessage(req, res, next){

  let payload = {
    conversationId: req.params.conversationId
    };
  return services.message.getUserMessage(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function getConverMessages(req, res, next){

  let payload = {
    senderId: req.params.senderId,
    receiverId: req.params.receiverId

    };
  return services.message.getConverMessages(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}