// const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { authenticateToken } = require("../helpers/auth")

module.exports = (server) => {
  server.post('/api/conversation',authenticateToken, controllers.conversation.saveConversation);
  server.get('/api/conversation/:userId',authenticateToken, controllers.conversation.getUserConversation);


}