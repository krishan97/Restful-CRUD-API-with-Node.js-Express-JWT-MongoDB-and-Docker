'use strict';
module.exports = (app) => {
  const Joi = require('joi');
  const users = require('../modules/users');
  const jwtAuth = require('../middleware/jwt');
  const validator = require('../middleware/schema-validator');
  const loginSchema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };
  const registerSchema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
  };
  app
    .route('/v1/users')
    .get(jwtAuth.decode, users.userCheck, users.getProfile)
    .post(validator(registerSchema), users.create)
    .put(validator(loginSchema), users.login, jwtAuth.encode)
    .patch(jwtAuth.decode, users.userCheck, users.update)
    .delete(jwtAuth.decode, users.delete);
};
