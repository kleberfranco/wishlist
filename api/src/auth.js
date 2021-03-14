const jwt = require('jsonwebtoken');

exports.generateAccessToken = function(username) {
  return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: process.env.ACCESS_TOKEN_EXPIRES + 's'});
};

exports.authenticateToken = function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).end();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).end();
    }
    req.user = user;
    next();
  });
};
