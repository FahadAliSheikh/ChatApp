const services = require('../services');

module.exports = {
  saveMessage,
  getConverMessages
};


function saveMessage(req, res, next){

  let payload = {
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    text:req.body.text
    };
  return services.message.saveMessage(payload)
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