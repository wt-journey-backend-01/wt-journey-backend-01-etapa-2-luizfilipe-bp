const { validate: isUuid } = require('uuid');
const ApiError = require('./ApiError');

function validateUUIDParam(req, res, next) {
    const id = req.params.id;
    if (!isUuid(id)) {
        throw new ApiError(404, 'Parâmetros inválidos', { id: 'O ID deve ser um UUID válido.' });
    }
    next();
}

module.exports = validateUUIDParam;
