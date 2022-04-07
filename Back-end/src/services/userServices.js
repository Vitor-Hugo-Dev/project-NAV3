const { User } = require('../database/models');
const Joi = require('joi');
const errorHandler = require("../utils/errorHandler");
const { badRequest } = require("../utils/statusCode");

const schema = Joi.object({
  login: Joi.string().min(5).required(),
  password: Joi.string().min(8).required(),
});

module.exports = {
  createUserService: async (user) => {
    const { error } = schema.validate(user);

    if (error) throw errorHandler(badRequest, error.message);

    const currentuser = await User.create({...user});

    return currentuser;
  },
  updateUserService: async (user, id) => {

  }
}
