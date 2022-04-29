const routes = require('express').Router();
const validateJWT = require('../middlewares/validateJWT');
const {
  createPeople,
  getPeoples,
  getPeopleById,
  getPeopleByCpf,
} = require('../controllers/peopleControllers');

routes.post(
  '/', validateJWT, createPeople,
)

routes.get(
  '/', validateJWT, getPeoples,
)

routes.get(
  '/:id', validateJWT, getPeopleById,
)

routes.post(
  '/cpf', validateJWT, getPeopleByCpf,
)

module.exports = routes;