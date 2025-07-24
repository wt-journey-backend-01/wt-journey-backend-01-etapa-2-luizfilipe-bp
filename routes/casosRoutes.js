const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');
const {
    validateCasoCreate,
    validateCasoPatch,
    validateStatusParam,
} = require('../utils/casosValidator');
const { validateIdParam, validateCasoIdParam } = require('../utils/validateIdParam');

router.get('/search', casosController.searchCasos);
router.get('/:caso_id/agente', validateCasoIdParam, casosController.getAgenteByCaso);

router.get('/', validateStatusParam, casosController.getAllCasos);
router.get('/:id', validateIdParam, casosController.getCasoById);
router.post('/', validateCasoCreate, casosController.postCaso);
router.put('/:id', validateIdParam, validateCasoCreate, casosController.updateCaso);
router.patch('/:id', validateIdParam, validateCasoPatch, casosController.patchCaso);
router.delete('/:id', validateIdParam, casosController.deleteCaso);

module.exports = router;
