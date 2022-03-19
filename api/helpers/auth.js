const jwt = require('jsonwebtoken');

module.exports = {
    createAccessToken,
    authenticateToken
}

function createAccessToken(user) {
    let userDate = {
        _id: user._id,
        username: user.username,
        email: user.email
    }
    const token = jwt.sign(userDate, process.env.TOKEN_SECRET, { expiresIn: '1d' })
    return token
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }