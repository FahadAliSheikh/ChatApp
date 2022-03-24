// const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { authenticateToken } = require("../helpers/auth")

module.exports = (server) => {
  server.post('/api/message',authenticateToken, controllers.message.saveMessage);
  server.get('/api/message/:conversationId',authenticateToken, controllers.message.getUserMessage);
  server.get('/api/message/:senderId/:receiverId',authenticateToken, controllers.message.getConverMessages);



}