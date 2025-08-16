const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');
const validateUUIDParam = require('../utils/validateUUIDParam');
const { validateSchema } = require('../utils/validateSchema');
const { postCasoSchema, putCasoSchema, patchCasoSchema } = require('../utils/casosSchema');

router.get('/search', casosController.searchCasos);
router.get('/:id/agente', validateUUIDParam, casosController.getAgenteByCaso);
router.get('/', casosController.getAllCasos);
router.get('/:id', validateUUIDParam, casosController.getCasoById);
router.post('/', validateSchema(postCasoSchema), casosController.postCaso);
router.put('/:id', validateUUIDParam, validateSchema(putCasoSchema), casosController.updateCaso);
router.patch('/:id', validateUUIDParam, validateSchema(patchCasoSchema), casosController.patchCaso);
router.delete('/:id', validateUUIDParam, casosController.deleteCaso);

module.exports = router;
