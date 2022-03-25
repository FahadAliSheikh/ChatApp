module.exports = server => {
  require('./auth')(server);
  require('./message')(server);
}