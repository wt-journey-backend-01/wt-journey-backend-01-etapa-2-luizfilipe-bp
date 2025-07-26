const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');
const { validateSchema } = require('../utils/validateSchema');
const {
    agentesPostSchema,
    agentesPutSchema,
    agentesPatchSchema,
    agentesFilterSchema,
    idParamSchema,
} = require('../utils/schemaValidator');

router.get('/', validateSchema(agentesFilterSchema, 'query'), agentesController.getAllAgentes);
router.get('/:id', validateSchema(idParamSchema, 'params'), agentesController.getAgenteById);
router.post('/', validateSchema(agentesPostSchema, 'body'), agentesController.postAgente);
router.put(
    '/:id',
    validateSchema(idParamSchema, 'params'),
    validateSchema(agentesPutSchema, 'body'),
    agentesController.putAgente
);
router.patch(
    '/:id',
    validateSchema(idParamSchema, 'params'),
    validateSchema(agentesPatchSchema, 'body'),
    agentesController.patchAgente
);
router.delete('/:id', validateSchema(idParamSchema, 'params'), agentesController.deleteAgente);

module.exports = router;
