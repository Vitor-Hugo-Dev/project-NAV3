const routes = require('express').Router();
const validateJWT = require('../middlewares/validateJWT');
const {
  createPeopleController,
  getPeoplesController,
  getPeopleByIdController,
  getPeopleByCpfController,
  getDebtorPeoplesController,
  deletePeopleController,
  dinamicGetPeoplesController,
} = require('../controllers/peopleControllers');

routes.post('/', validateJWT, createPeopleController);

routes.get('/', validateJWT, getPeoplesController);

routes.get('/debtor', validateJWT, getDebtorPeoplesController);

routes.get('/cpf', validateJWT, getPeopleByCpfController);

routes.get('/role', validateJWT, dinamicGetPeoplesController);

routes.get('/:id', validateJWT, getPeopleByIdController);

routes.delete('/:id', validateJWT, deletePeopleController);

module.exports = routes;
