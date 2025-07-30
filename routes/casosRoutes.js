const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');
const validateUUIDParam = require('../utils/validateUUIDParam');
    
router.get('/search', casosController.searchCasos);
router.get('/:id/agente', validateUUIDParam, casosController.getAgenteByCaso);
router.get('/', casosController.getAllCasos);
router.get('/:id', validateUUIDParam, casosController.getCasoById);
router.post('/', casosController.postCaso);
router.put('/:id', validateUUIDParam, casosController.updateCaso);
router.patch('/:id', validateUUIDParam, casosController.patchCaso);
router.delete('/:id', validateUUIDParam, casosController.deleteCaso);

module.exports = router;
