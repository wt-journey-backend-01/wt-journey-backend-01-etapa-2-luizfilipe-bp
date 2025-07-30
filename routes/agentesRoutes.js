const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');
const validateUUIDParam = require('../utils/validateUUIDParam');

router.get('/', agentesController.getAllAgentes);
router.get('/:id', validateUUIDParam, agentesController.getAgenteById);
router.post('/', agentesController.postAgente);
router.put('/:id', validateUUIDParam, agentesController.putAgente);
router.patch('/:id', validateUUIDParam, agentesController.patchAgente);
router.delete('/:id', validateUUIDParam, agentesController.deleteAgente);

module.exports = router;
