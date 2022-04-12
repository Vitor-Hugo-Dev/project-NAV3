const routes = require('express').Router();

const { createPeople, getPeoples, getPeopleById } = require('../controllers/peopleControllers');

routes.post(
  '/', createPeople,
)

routes.get(
  '/', getPeoples,
)

routes.get(
  '/:id', getPeopleById,
)

module.exports = routes;