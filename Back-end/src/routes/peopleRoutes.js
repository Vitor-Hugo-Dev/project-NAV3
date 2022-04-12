const routes = require('express').Router();

const {
  createPeople,
  getPeoples,
  getPeopleById,
  getPeopleByCpf,
} = require('../controllers/peopleControllers');

routes.post(
  '/', createPeople,
)

routes.get(
  '/', getPeoples,
)

routes.get(
  '/:id', getPeopleById,
)

routes.post(
  '/cpf', getPeopleByCpf,
)

module.exports = routes;