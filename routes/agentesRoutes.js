const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');
const { validateAgenteCreate, validateAgentePatch } = require('../utils/agentesValidator');
const { validateIdParam } = require('../utils/validateIdParam');
router.get('/', agentesController.getAllAgentes);
router.get('/:id', validateIdParam, agentesController.getAgenteById);
router.post('/', validateAgenteCreate, agentesController.postAgente);
router.put('/:id', validateIdParam, validateAgenteCreate, agentesController.putAgente);
router.patch('/:id', validateIdParam, validateAgentePatch, agentesController.patchAgente);
router.delete('/:id', validateIdParam, agentesController.deleteAgente);

module.exports = router;
