// const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { authenticateToken } = require("../helpers/auth")
const { saveMessageValidationRules,getMessageValidationRules, validate } = require('../validators/index.js')

module.exports = (server) => {
  server.post('/api/message', [authenticateToken, saveMessageValidationRules(), validate], controllers.message.saveMessage);
  server.get('/api/message/:senderId/:receiverId',[authenticateToken, getMessageValidationRules(), validate],controllers.message.getConverMessages);
}