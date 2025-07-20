const { ZodError } = require('zod');

function errorHandler(err, req, res, next) {
    if (err instanceof ZodError) {
        const errors = {};
        for (const issue of err.issues) {
            const path = issue.path.join('.');
            if (!(path in errors)) errors[path] = issue.message;
        }
        return res.status(400).json({
            status: 400,
            message: 'Parâmetros inválidos',
            errors,
        });
    }

    next(err);
}
module.exports = errorHandler;
