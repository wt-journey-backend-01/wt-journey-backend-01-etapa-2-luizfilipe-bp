const { validate: isUuid } = require('uuid');

function validateUUIDParam(req, res, next) {
    const id = req.params.id;
    if (!isUuid(id)) {
        return res.status(404).json({ message: 'ID inválido: deve ser um UUID.' });
    }
    next();
}

module.exports = validateUUIDParam;
