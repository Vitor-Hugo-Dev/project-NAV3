const routes = require('express').Router();
const validateJWT = require('../middlewares/validateJWT');
const {
  createPeopleController,
  getPeoplesController,
  getPeopleByIdController,
  getPeopleByCpfController,
  getDebtorPeoplesController,
  getNotDebtorPeoplesController,
  deletePeopleController,
  dynamicGetPeoplesController,
} = require('../controllers/peopleControllers');

routes.post('/', validateJWT, createPeopleController);

routes.get('/', validateJWT, getPeoplesController);

routes.get('/debtor', validateJWT, getDebtorPeoplesController);

routes.get('/not-debtor', validateJWT, getNotDebtorPeoplesController);

routes.get('/cpf', validateJWT, getPeopleByCpfController);

routes.get('/role', validateJWT, dynamicGetPeoplesController);

routes.get('/:id', validateJWT, getPeopleByIdController);

routes.delete('/:id', validateJWT, deletePeopleController);

module.exports = routes;
