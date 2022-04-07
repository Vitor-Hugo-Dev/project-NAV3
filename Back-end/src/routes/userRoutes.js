const routes = require('express').Router();

const { createUserController } = require('../controllers/userControllers');

routes.post(
  '/', 
  createUserController
);

module.exports = routes;