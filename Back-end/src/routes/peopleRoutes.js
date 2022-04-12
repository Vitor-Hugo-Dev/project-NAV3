const routes = require('express').Router();

const { createPeople, getPeoples } = require('../controllers/peopleControllers');

routes.post(
  '/', createPeople,
)

routes.get(
  '/', getPeoples,
)

module.exports = routes;