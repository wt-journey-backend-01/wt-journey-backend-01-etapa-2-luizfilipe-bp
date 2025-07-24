const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const ApiError = require('../utils/ApiError');
const { getAgenteOrThrowApiError } = require('./agentesController');

function getCasoOrThrowApiError(id) {
    const caso = casosRepository.findById(id);
    if (!caso) {
        throw new ApiError(404, `Não foi possível encontrar o caso de Id: ${id}`);
    }
    return caso;
}

function getAllCasos(req, res) {
    const agente_id = req.query.agente_id;
    const status = req.query.status;

    let casos = casosRepository.findAll();
    if (agente_id) {
        casos = casos.filter((caso) => caso.agente_id === agente_id);
        if (casos.length === 0) {
            throw new ApiError(404, `Nenhum caso foi encontrado para o agente de Id: ${agente_id}`);
        }
    }
    if (status) {
        casos = casos.filter((caso) => caso.status === status);
        if (casos.length === 0) {
            throw new ApiError(404, `Nenhum caso foi encontrado com o status: ${status}`);
        }
    }

    res.status(200).json(casos);
}

function getCasoById(req, res) {
    const id = req.params.id;
    const caso = getCasoOrThrowApiError(id);
    res.status(200).json(caso);
}

function getAgenteByCaso(req, res) {
    const caso_id = req.params.caso_id;
    const caso = getCasoOrThrowApiError(caso_id);

    const agente = agentesRepository.findById(caso.agente_id);
    res.status(200).json(agente);
}

function searchCasos(req, res) {
    const search = req.query.q?.trim();
    if (!search) {
        throw new ApiError(404, "Parâmetro de pesquisa 'q' não encontrado");
    }

    const searchedCasos = casosRepository.search(search);
    if (searchedCasos.length === 0) {
        throw new ApiError(404, 'Não foi possível encontrar casos que correspondam à pesquisa');
    }
    res.status(200).send(searchedCasos);
}

function postCaso(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;
    getAgenteOrThrowApiError(agente_id);

    const createdCasoData = {
        titulo,
        descricao,
        status,
        agente_id,
    };
    const createdCaso = casosRepository.create(createdCasoData);
    res.status(201).json(createdCaso);
}

function updateCaso(req, res) {
    const id = req.params.id;
    getCasoOrThrowApiError(id);

    const { titulo, descricao, status, agente_id } = req.body;
    getAgenteOrThrowApiError(agente_id);

    const updatedCasoData = {
        titulo,
        descricao,
        status,
        agente_id,
    };
    const updatedCaso = casosRepository.update(id, updatedCasoData);
    res.status(200).json(updatedCaso);
}

function patchCaso(req, res) {
    const id = req.params.id;
    const caso = getCasoOrThrowApiError(id);

    const { titulo, descricao, status, agente_id } = req.body;
    if (agente_id !== undefined) getAgenteOrThrowApiError(agente_id);

    const patchedCasoData = {
        titulo: titulo ?? caso.titulo,
        descricao: descricao ?? caso.descricao,
        status: status ?? caso.status,
        agente_id: agente_id ?? caso.agente_id,
    };
    const patchedCaso = casosRepository.update(id, patchedCasoData);
    res.status(200).json(patchedCaso);
}

function deleteCaso(req, res) {
    const id = req.params.id;
    getCasoOrThrowApiError(id);

    casosRepository.remove(id);
    res.status(204).send();
}

module.exports = {
    getAllCasos,
    getCasoById,
    postCaso,
    updateCaso,
    patchCaso,
    deleteCaso,
    getAgenteByCaso,
    searchCasos,
};
