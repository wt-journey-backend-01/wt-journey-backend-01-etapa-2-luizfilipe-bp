const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Departamento de Polícia',
            version: '1.0.0',
            description:
                'API para gerenciamento de informações sobre casos e agentes do Departamento de Polícia',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de local desenvolvimento',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(options);
function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

module.exports = setupSwagger;
