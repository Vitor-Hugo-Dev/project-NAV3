const routes = require('express').Router();

const { loginControler } = require('../controllers/loginControllers');

routes.post(
  '/',
  loginControler,
);

module.exports = routes;