const { query } = require('express-validator');
const { validationHandler } = require('./validationHandler');

const validateSort = [
    query('sort')
        .optional()
        .isIn(['dataDeIncorporacao', '-dataDeIncorporacao'])
        .withMessage("O parâmetro 'sort' deve ser 'dataDeIncorporacao' ou '-dataDeIncorporacao'"),
    validationHandler,
];

const validateCargo = [
    query('cargo')
        .optional()
        .isIn(['delegado', 'inspetor'])
        .withMessage("O parâmetro 'cargo' deve ser 'delegado' ou 'inspetor'"),
    validationHandler,
];

module.exports = {
    validateSort,
    validateCargo,
};
