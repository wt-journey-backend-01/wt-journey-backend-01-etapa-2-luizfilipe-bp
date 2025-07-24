const { param } = require('express-validator');
const { validationHandler } = require('./validationHandler');

const validateIdParam = [param('id').isUUID().withMessage('O ID deve ser um UUID válido')];
const validateCasoIdParam = [
    param('caso_id').isUUID().withMessage('O ID do caso deve ser um UUID válido'),
    validationHandler,
];
module.exports = {
    validateIdParam,
    validateCasoIdParam,
};
