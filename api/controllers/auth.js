const services = require('../services');

module.exports = {
  signup,
  signin,
  getUsers,
  // logout,
  // getToken
};

function signup(req, res, next){
  console.log('Inside controller');
  console.log(req.body);
  // res.send( 'working fine!');
  let payload = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
    };
  return services.auth.signup(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function signin(req, res, next){
  console.log('Inside signin controller');
  console.log(req.body);
  // res.send( 'working fine!');
  let payload = {
    email: req.body.email,
    password: req.body.password,
    };
  return services.auth.signin(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function getUsers(req, res, next){
  let payload = {
  userId: req.body.userId,
  username: req.body.username
  };
  return services.auth.getUsers(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}