const errorHandler = require('./../handler/error.handler');
const jwt = require('jsonwebtoken');
const message = require('../constant/index');

//  JWT Token encode
module.exports.encode = (req, res, ) => {
  jwt.sign(
    {
      email: res.userinfo.email,
    },
    message.JWT_SECRET,
    (err, token) => {
      if (err) {
        res.status(400).send(
          {
            message: errorHandler.getErrorMessage(err),
          });
      } else {
        res.status(200).send({
          token,
        });
      }
    }
  );
};

//  JWT Token Decode
module.exports.decode = (req, res, next) => {
  if (req.headers['authorization'] === void 0) {
    res.sendStatus(401);
    return false;
  }

  const accessToken = req.headers['authorization'].split(' ');
  if (accessToken[0] !== 'Bearer') {
    res.sendStatus(401);
    return false;
  }
  jwt.verify(accessToken[2], message.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.user = decoded.email;
      next();
    }
  });
};
