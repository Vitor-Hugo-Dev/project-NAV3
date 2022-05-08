const routes = require('express').Router();

const { createUserController } = require('../controllers/userControllers');
const validateJWT = require('../middlewares/validateJWT');

routes.post('/', validateJWT, createUserController);

module.exports = routes;
