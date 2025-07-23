const { validationResult } = require('express-validator');
const ApiError = require('./ApiError');
const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Transforma o array de erros em objeto { campo: mensagem }
        const errorObj = {};
        errors.array().forEach((err) => {
            errorObj[err.path] = err.msg;
        });
        throw new ApiError(400, 'Parametros inválidos', errorObj);
    }
    next();
};

module.exports = {
    validationHandler,
};
