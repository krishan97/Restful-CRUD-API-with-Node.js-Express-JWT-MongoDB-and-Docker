'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { errorHandler } = require('./../handler/error.handler');
const user = mongoose.model('users');
// User Create Profile
module.exports.create = (req, res) => {
  try {
    const doc = new user(req.body);
    doc.save((err) => {
      if (err) {
        res.status(400).send({
          message: errorHandler.getErrorMessage(err),
        });
      } else {
        res.sendStatus(200);
      }
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

// Login User
module.exports.login = (req, res, next) => {
  try {
    user.findOne({
      email: req.body.email,
      password: req.body.password,
    }, { password: 0, _id: 0 }, (err, doc) => {
      if (err) {
        res.status(400).send({
          message: errorHandler.getErrorMessage(err),
        });
      } else {
        res.userinfo = doc;
        next();
      }
    }
    );
  } catch (err) {
    res.sendStatus(500);
  }
};

// User View Profile
module.exports.getProfile = (req, res) => {
  try {
    res.status(200).send(res.userinfo);
  } catch (err) {
    res.sendStatus(500);
  }
};

// User Update Profile
module.exports.update = (req, res, ) => {
  if (req.body.email) {
    delete req.body.email;
  }
  if (req.body.created) {
    delete req.body.created;
  }
  try {
    user.updateOne({
      email: res.user,
    }, req.body, (err) => {
      if (err) {
        res.status(400).send({
          message: errorHandler.getErrorMessage(err),
        });
      } else {
        res.sendStatus(204);
      }
    }
    );
  } catch (err) {
    res.sendStatus(500);
  }
};

// Check User information
module.exports.userCheck = (req, res, next) => {
  try {
    user.findOne({
      email: res.user,
    }, { _id: 0, password: 0 }, (err, doc) => {
      if (err) {
        res.status(400).send({
          message: errorHandler.getErrorMessage(err),
        });
      } else if (doc === null || doc.length === 0) {
        res.sendStatus(401);
      } else {
        res.userinfo = doc;
        next();
      }
    }
    );
  } catch (err) {
    res.sendStatus(500);
  }
};

//delete users
module.exports.delete = (req, res, ) => {
  try {
    user.deleteOne({
      email: res.user,
    }, (err) => {
      if (err) {
        res.status(400).send({
          message: errorHandler.getErrorMessage(err),
        });
      } else {
        res.sendStatus(204);
      }
    });
  } catch (err) {
    res.sendStatus(500);
  }
};
