const services = require('../services');

module.exports = {
  saveConversation,
  getUserConversation
};


function saveConversation(req, res, next){

  let payload = {
    senderId: req.body.senderId,
    receiverId: req.body.receiverId
    };
  return services.conversation.saveConversation(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function getUserConversation(req, res, next){

  let payload = {
    userId: req.params.userId
    };
  return services.conversation.getUserConversation(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}