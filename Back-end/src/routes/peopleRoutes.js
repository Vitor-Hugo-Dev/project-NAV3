const routes = require('express').Router();
const validateJWT = require('../middlewares/validateJWT');
const {
  createPeople,
  getPeoples,
  getPeopleById,
  getPeopleByCpf,
  getDebtorPeoples,
  deletePeopleController,
} = require('../controllers/peopleControllers');

routes.post('/', validateJWT, createPeople);

routes.get('/', validateJWT, getPeoples);

routes.get('/debtor', validateJWT, getDebtorPeoples);

routes.get('/cpf', validateJWT, getPeopleByCpf);

routes.get('/:id', validateJWT, getPeopleById);

routes.delete('/:id', validateJWT, deletePeopleController);

module.exports = routes;
