module.exports = server => {
  require('./auth')(server);
  require('./conversation')(server);
  require('./message')(server);
}