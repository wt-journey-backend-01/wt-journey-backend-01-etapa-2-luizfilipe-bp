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
    if (sort && !['dataDeIncorporacao', '-dataDeIncorporacao'].includes(sort)) {
        throw new ApiError(400, 'Parâmetros inválidos', {
            sort: "O parâmetro 'sort' deve ser 'dataDeIncorporacao' ou '-dataDeIncorporacao'.",
        });
    }
    const filtros = {};
    if (cargo) filtros.cargo = cargo;
    if (sort) filtros.sort = sort;
    const agentes = agentesRepository.findAll(filtros);

    if (cargo) {
        if (agentes.length === 0) {
            throw new ApiError(404, `Não foi possível encontrar agentes com o cargo: ${cargo}.`);
        }
    }
    res.status(200).json(agentes);
}

function getAgenteById(req, res) {
    const id = req.params.id;
    const agente = getAgenteOrThrowApiError(id);
    res.status(200).json(agente);
}

function postAgente(req, res) {
    const agente = req.body;
    const createdAgente = agentesRepository.create(agente);
    res.status(201).json(createdAgente);
}

function putAgente(req, res) {
    const id = req.params.id;
    getAgenteOrThrowApiError(id);

    const agente = req.body;
    const updatedAgente = agentesRepository.update(id, agente);
    res.status(200).json(updatedAgente);
}

function patchAgente(req, res) {
    const id = req.params.id;
    getAgenteOrThrowApiError(id);

    const agente = req.body;
    if (Object.keys(agente).length === 0) {
        throw new ApiError(
            400,
            'Deve haver pelo menos um campo para realizar a atualização de agente'
        );
    }
    const updatedAgente = agentesRepository.update(id, agente);
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
