const { body, param } = require('express-validator');
const { validationHandler } = require('./validationHandler');

const validateCasoCreate = [
    body('id').not().exists().withMessage('Não é permitido a alteração de id'),
    body('titulo').notEmpty().withMessage("O campo 'titulo' é obrigatório"),
    body('descricao').notEmpty().withMessage("O campo 'descricao' é obrigatório"),
    body('status')
        .notEmpty()
        .withMessage("O campo 'status' é obrigatório")
        .bail()
        .isIn(['aberto', 'solucionado'])
        .withMessage("O campo 'status' deve ser 'aberto' ou 'solucionado'"),
    body('agente_id')
        .notEmpty()
        .withMessage("O campo 'agente_id' é obrigatório")
        .bail()
        .isUUID(4)
        .withMessage("O campo 'agente_id' deve ser um UUID válido"),
    validationHandler,
];

const validateCasoPatch = [
    body('id').not().exists().withMessage('Não é permitido a alteração de id'),
    body('titulo').optional().notEmpty().withMessage("O campo 'titulo' não pode ser vazio"),
    body('descricao').optional().notEmpty().withMessage("O campo 'descricao' não pode ser vazio"),
    body('status')
        .optional()
        .notEmpty()
        .withMessage("O campo 'status' não pode ser vazio")
        .bail()
        .isIn(['aberto', 'solucionado'])
        .withMessage("O campo 'status' deve ser 'aberto' ou 'solucionado'"),
    body('agente_id')
        .optional()
        .notEmpty()
        .withMessage("O campo 'agente_id' não pode ser vazio")
        .bail()
        .isUUID(4)
        .withMessage("O campo 'agente_id' deve ser um UUID válido"),
    validationHandler,
];

const validateStatusParam = [
    param('status')
        .optional()
        .isIn(['aberto', 'solucionado'])
        .withMessage("O parâmetro 'status' deve ser 'aberto' ou 'solucionado'"),
    validationHandler,
];

module.exports = {
    validateCasoCreate,
    validateCasoPatch,
    validateStatusParam,
};
