const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');

function getAllCasos(req, res) {
    const agente_id = req.query.agente_id;
    const status = req.query.status;

    const casos = casosRepository.findAll(agente_id, status);
    if (casos.length === 0) {
        return res.status(204).send();
    }
    res.status(200).json(casos);
}

function getCasoById(req, res) {
    const id = req.params.id;
    const caso = casosRepository.findById(id);

    if (!caso) {
        return res.status(404).send(`Não foi possível encontrar o caso de Id: ${id}`);
    }
    res.status(200).json(caso);
}

function getAgenteByCaso(req, res) {
    const caso_id = req.params.caso_id;

    const caso = casosRepository.findById(caso_id);
    if (!caso) {
        return res.status(404).send(`Não foi possível encontrar o caso de Id: ${caso_id}`);
    }

    const agente_id = caso.agente_id;
    const agente = agentesRepository.findById(agente_id);

    res.status(200).json(agente);
}

function searchCasos(req, res) {
    const search = req.query.q;

    const searchedCasos = casosRepository.search(search);
    if (searchedCasos.length === 0) {
        return res.status(204).send();
    }
    res.status(200).send(searchedCasos);
}

function postCaso(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const agente = agentesRepository.findById(agente_id);
    if (!agente) {
        return res.status(404).send(`Não foi possível encontrar o agente de Id: ${agente_id}`);
    }

    const createdCasoData = {
        titulo: titulo,
        descricao: descricao,
        status: status,
        agente_id: agente_id,
    };

    const createdCaso = casosRepository.create(createdCasoData);
    res.status(201).json(createdCaso);
}

function updateCaso(req, res) {
    const id = req.params.id;
    const { titulo, descricao, status, agente_id } = req.body;

    const existingCaso = casosRepository.findById(id);
    if (!existingCaso) {
        return res.status(404).send(`Não foi possível encontrar o caso de Id: ${id}`);
    }

    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).send('Todos os campos são obrigatórios'  );
    }
    const agente = agentesRepository.findById(agente_id);
    if (!agente) {
        return res.status(404).send(`Não foi possível encontrar o agente de Id: ${agente_id}`);
    }

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
    const existingCaso = casosRepository.findById(id);

    if (!existingCaso) {
        return res.status(404).send(`Não foi possível encontrar o caso de Id: ${id}`);
    }
    const { titulo, descricao, status, agente_id } = req.body;
    if(agente_id && !agentesRepository.findById(agente_id)) {
        return res.status(404).send(`Não foi possível encontrar o agente de Id: ${agente_id}`);
    }

    const patchedCasoData = {
        titulo: titulo ?? existingCaso.titulo,
        descricao: descricao ?? existingCaso.descricao,
        status: status ?? existingCaso.status,
        agente_id: agente_id ?? existingCaso.agente_id,
    };

    const patchedCaso = casosRepository.update(id, patchedCasoData);
    res.status(200).json(patchedCaso);
}

function deleteCaso(req, res) {
    const id = req.params.id;
    const caso = casosRepository.findById(id);

    if (!caso) {
        return res.status(404).json(`Não foi possível deletar o caso de Id ${id}`);
    }

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