/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = (userData) => {
  const token = jwt.sign(userData, secret, jwtConfig);
  return token;
};
