const services = require('../services');

module.exports = {
  saveMessage,
  getUserMessage
};


function saveMessage(req, res, next){

  let payload = {
    conversationId: req.body.conversationId,
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