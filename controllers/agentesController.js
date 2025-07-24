const agentesRepository = require('../repositories/agentesRepository');
const ApiError = require('../utils/ApiError');

function getAgenteOrThrowApiError(id) {
    const agente = agentesRepository.findById(id);
    if (!agente) {
        throw new ApiError(404, `Não foi possível encontrar o agente de Id: ${id}.`);
    }
    return agente;
}

function getAllAgentes(req, res) {
    const cargo = req.query.cargo;
    const sort = req.query.sort;

    let agentes = agentesRepository.findAll();

    if (cargo) {
        agentes = agentes.filter((agente) => agente.cargo === cargo);
        if (agentes.length === 0) {
            throw new ApiError(404, `Nenhum agente de 'cargo' ${cargo} foi encontrado.`);
        }
    }

    if (sort && (sort === 'dataDeIncorporacao' || sort === '-dataDeIncorporacao')) {
        agentes = agentes.sort((a, b) => {
            const dateA = new Date(a.dataDeIncorporacao);
            const dateB = new Date(b.dataDeIncorporacao);

            if (sort === '-dataDeIncorporacao') {
                return dateB.getTime() - dateA.getTime();
            }
            if (sort === 'dataDeIncorporacao') {
                return dateA.getTime() - dateB.getTime();
            }
            return 0;
        });
    }
    res.status(200).json(agentes);
}

function getAgenteById(req, res) {
    const id = req.params.id;
    const agente = getAgenteOrThrowApiError(id);
    res.status(200).json(agente);
}

function postAgente(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;

    const novoAgenteData = {
        nome: nome,
        dataDeIncorporacao: dataDeIncorporacao,
        cargo: cargo,
    };
    const createdAgente = agentesRepository.create(novoAgenteData);
    res.status(201).json(createdAgente);
}

function putAgente(req, res) {
    const id = req.params.id;
    getAgenteOrThrowApiError(id);

    const { updatedAgenteData } = req.body;
    const updatedAgente = agentesRepository.update(id, updatedAgenteData);
    res.status(200).json(updatedAgente);
}

function patchAgente(req, res) {
    const id = req.params.id;
    const agente = getAgenteOrThrowApiError(id);
    const { nome, dataDeIncorporacao, cargo } = req.body;

    const updatedAgenteData = {
        nome: nome ?? agente.nome,
        dataDeIncorporacao: dataDeIncorporacao ?? agente.dataDeIncorporacao,
        cargo: cargo ?? agente.cargo,
    };

    const updatedAgente = agentesRepository.update(id, updatedAgenteData);
    res.status(200).json(updatedAgente);
}

function deleteAgente(req, res) {
    const id = req.params.id;
    getAgenteOrThrowApiError(id);

    agentesRepository.remove(id);
    res.status(204).send();
}
module.exports = {
    getAllAgentes,
    getAgenteById,
    postAgente,
    putAgente,
    patchAgente,
    deleteAgente,
    getAgenteOrThrowApiError,
};
