const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');
const validateUUIDParam = require('../utils/validateUUIDParam');
const { postAgenteSchema, putAgenteSchema, patchAgenteSchema } = require('../utils/agentesSchema');
const { validateSchema } = require('../utils/validateSchema');

router.get('/', agentesController.getAllAgentes);
router.get('/:id', validateUUIDParam, agentesController.getAgenteById);
router.post('/', validateSchema(postAgenteSchema), agentesController.postAgente);
router.put('/:id', validateUUIDParam, validateSchema(putAgenteSchema), agentesController.putAgente);
router.patch(
    '/:id',
    validateUUIDParam,
    validateSchema(patchAgenteSchema),
    agentesController.patchAgente
);
router.delete('/:id', validateUUIDParam, agentesController.deleteAgente);

module.exports = router;
