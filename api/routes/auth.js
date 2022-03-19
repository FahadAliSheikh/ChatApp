// const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = (server) => {
  server.post('/api/signup', controllers.auth.signup);
  server.post('/api/signin', controllers.auth.signin);
  server.get("/api/getUsers", controllers.auth.getUsers);


}