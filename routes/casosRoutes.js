const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');
const {
    validateCasoCreate,
    validateCasoPatch,
    validateStatusParam,
} = require('../utils/casosValidator');

router.get('/search', casosController.searchCasos);
router.get('/:caso_id/agente', casosController.getAgenteByCaso);

router.get('/', validateStatusParam, casosController.getAllCasos);
router.get('/:id', casosController.getCasoById);
router.post('/', validateCasoCreate, casosController.postCaso);
router.put('/:id', validateCasoCreate, casosController.updateCaso);
router.patch('/:id', validateCasoPatch, casosController.patchCaso);
router.delete('/:id', casosController.deleteCaso);

module.exports = router;
