const express = require('express');
const app = express();

app.use(express.json());

const casosRouter = require('./routes/casosRoutes');
app.use('/casos', casosRouter);

const agentesRouter = require('./routes/agentesRoutes');
app.use('/agentes', agentesRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(
        `Servidor do Departamento de Polícia rodando em http://localhost:${PORT} em modo de desenvolvimento`
    );
});
