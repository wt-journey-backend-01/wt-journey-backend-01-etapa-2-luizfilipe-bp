const { ZodError } = require('zod');

function errorHandler(err, req, res, next) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            status: 400,
            message: 'Parâmetros inválidos',
            errors: Object.fromEntries(
                err.issues.map((issue) => [issue.path.join('.'), issue.message])
            ),
        });
    }

    next(err);
}
module.exports = errorHandler;
