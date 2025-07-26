const z = require('zod');

function validateSchema(schema, source = 'body') {
    return (req, res, next) => {
        const data = req[source];
        const results = schema.safeParse(data);

        if (!results.success) {
            const issues = results.error.issues;
            const errors = {};

            for (const issue of issues) {
                const field = issue.path[0];
                errors[field] = issue.message;
            }

            return res.status(400).json({
                status: 400,
                message: 'Parametros inválidos',
                errors,
            });
        }

        req[source] = results.data;
        next();
    };
}

module.exports = {
    validateSchema,
};
