// const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { signUpValidationRules,signInValidationRules, validate } = require('../validators/index.js')

module.exports = (server) => {
  server.post('/api/signup', signUpValidationRules(), validate, controllers.auth.signup);
  server.post('/api/signin', signInValidationRules(), validate, controllers.auth.signin);
  server.get("/api/getUsers", controllers.auth.getUsers);


}