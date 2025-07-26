const z = require('zod');

function validateSchema(schema) {
    return (req, res, next) => {
        const data = req.body;
        console.log(data);
        const results = schema.safeParse(data);
        console.log(results);

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

        req.body = results.data;
        next();
    };
}

module.exports = {
    validateSchema,
};
