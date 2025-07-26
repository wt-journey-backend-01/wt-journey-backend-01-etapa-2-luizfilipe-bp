const z = require('zod');

function validateIdParam(schema) {
    return (req, res, next) => {
        const results = schema.safeParse(req.params);

        if (!results.success) {
            const issues = results.error.issues;
            const errors = {};

            for (const issue of issues) {
                const field = issue.path[0];
                errors[field] = issue.message;
            }

            return res.status(404).json({
                status: 404,
                message: 'Parametros inválidos',
                errors,
            });
        }

        req.params = results.data;
        next();
    };
}

module.exports = {
    validateIdParam,
};
