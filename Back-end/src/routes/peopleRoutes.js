const routes = require('express').Router();
const validateJWT = require('../middlewares/validateJWT');
const {
  createPeople,
  getPeoples,
  getPeopleById,
  getPeopleByCpf,
  getDebtorPeoples,
} = require('../controllers/peopleControllers');

routes.post('/', validateJWT, createPeople);

routes.get('/', validateJWT, getPeoples);

routes.get('/debtor', validateJWT, getDebtorPeoples);

routes.get('/cpf', validateJWT, getPeopleByCpf);

routes.get('/:id', validateJWT, getPeopleById);

module.exports = routes;
