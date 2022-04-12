const routes = require('express').Router();

const { createPeople } = require('../controllers/peopleControllers');

routes.post(
  '/', createPeople,
)

module.exports = routes;