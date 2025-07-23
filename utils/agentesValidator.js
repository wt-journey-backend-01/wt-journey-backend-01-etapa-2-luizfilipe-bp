const { body } = require('express-validator');
const { validationHandler } = require('./validationHandler');

const rejectFutureDate = (date) => {
    const today = new Date();
    if (new Date(date) > today) {
        throw new Error("O campo 'dataDeIncorporacao' não pode ser uma data futura");
    }
    return true;
};

const validateAgenteCreate = [
    body('nome').notEmpty().withMessage("O campo 'nome' é obrigatório"),

    body('dataDeIncorporacao')
        .notEmpty()
        .withMessage("O campo 'dataDeIncorporacao' é obrigatório")
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage("Campo 'dataDeIncorporacao' deve ser no formato 'YYYY-MM-DD'")
        .bail()
        .custom(rejectFutureDate),

    body('cargo')
        .notEmpty()
        .withMessage("O campo 'cargo' é obrigatório")
        .bail()
        .isIn(['delegado', 'inspetor'])
        .withMessage("O campo 'cargo' deve ser 'delegado' ou 'inspetor'"),
    validationHandler,
];

const validateAgentePatch = [
    body('nome').optional().notEmpty().withMessage("O campo 'nome' não pode ser vazio"),

    body('dataDeIncorporacao')
        .optional()
        .notEmpty()
        .withMessage("O campo 'dataDeIncorporacao' não pode ser vazio")
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage("Campo 'dataDeIncorporacao' deve ser no formato 'YYYY-MM-DD'")
        .bail()
        .custom(rejectFutureDate),

    body('cargo')
        .optional()
        .notEmpty()
        .withMessage("O campo 'cargo' não pode ser vazio")
        .bail()
        .isIn(['delegado', 'inspetor'])
        .withMessage("O campo 'cargo' deve ser 'delegado' ou 'inspetor'"),
    validationHandler,
];

module.exports = {
    validateAgenteCreate,
    validateAgentePatch,
};
