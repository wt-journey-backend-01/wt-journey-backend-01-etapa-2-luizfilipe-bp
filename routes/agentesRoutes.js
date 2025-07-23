const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');
const { validateAgenteCreate, validateAgentePatch } = require('../utils/agentesValidator');
const { validateSort, validateCargo } = require('../utils/parametrosValidator');

router.get('/', validateSort, validateCargo, agentesController.getAllAgentes);
router.get('/:id', agentesController.getAgenteById);
router.post('/', validateAgenteCreate, agentesController.postAgente);
router.put('/:id', validateAgenteCreate, agentesController.putAgente);
router.patch('/:id', validateAgentePatch, agentesController.patchAgente);
router.delete('/:id', agentesController.deleteAgente);

module.exports = router;
