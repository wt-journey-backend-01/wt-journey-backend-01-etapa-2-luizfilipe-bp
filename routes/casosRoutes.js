const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');
const { validateSchema } = require('../utils/validateSchema');
const {
    casosPostSchema,
    casosPutSchema,
    casosPatchSchema,
    casosFilterSchema,
    idParamSchema,
} = require('../utils/schemaValidator');

router.get('/search', casosController.searchCasos);
router.get('/:id/agente', validateSchema(idParamSchema, 'params'), casosController.getAgenteByCaso);

router.get('/', validateSchema(casosFilterSchema, 'query'), casosController.getAllCasos);
router.get('/:id', validateSchema(idParamSchema, 'params'), casosController.getCasoById);
router.post('/', validateSchema(casosPostSchema, 'body'), casosController.postCaso);
router.put(
    '/:id',
    validateSchema(idParamSchema, 'params'),
    validateSchema(casosPutSchema, 'body'),
    casosController.updateCaso
);
router.patch(
    '/:id',
    validateSchema(idParamSchema, 'params'),
    validateSchema(casosPatchSchema, 'body'),
    casosController.patchCaso
);
router.delete('/:id', validateSchema(idParamSchema, 'params'), casosController.deleteCaso);

module.exports = router;
