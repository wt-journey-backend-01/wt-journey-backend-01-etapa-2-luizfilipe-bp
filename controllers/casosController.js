const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');

function getAllCasos(req, res) {
    const agente_id = req.query.agente_id;
    const status = req.query.status;

    let casos = casosRepository.findAll();
    if (status) {
        if (!['aberto', 'solucionado'].includes(status)) {
            return res.status(400).json({
                message: 'O status deve ser "aberto" ou "solucionado".',
            });
        }
        casos = casos.filter((caso) => caso.status === status);
        if (casos.length === 0) {
            return res.status(404).json({
                message: `Não foi possível encontrar casos com o status: ${status}.`,
            });
        }
    }

    if (agente_id) {
        casos = casos.filter((caso) => caso.agente_id === agente_id);
        if (casos.length === 0) {
            return res.status(404).json({
                message: `Nenhum caso foi encontrado para o agente de Id: ${agente_id}`,
            });
        }
    }
    res.status(200).json(casos);
}

function getCasoById(req, res) {
    const id = req.params.id;
    const caso = casosRepository.findById(id);
    if (!caso) {
        return res.status(404).json({
            message: `Não foi possível encontrar o caso de Id: ${id}.`,
        });
    }
    res.status(200).json(caso);
}

function getAgenteByCaso(req, res) {
    const caso_id = req.params.id;
    const caso = casosRepository.findById(caso_id);
    if (!caso) {
        return res.status(404).json({
            message: `Não foi possível encontrar o caso de Id: ${caso_id}.`,
        });
    }
    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) {
        return res.status(404).json({
            message: `O caso de Id: ${caso_id} não possui um agente associado a ele.`,
        });
    }
    res.status(200).json(agente);
}

function searchCasos(req, res) {
    const search = req.query.q?.trim().toLowerCase();
    if (!search) {
        return res.status(404).json({ message: "Parâmetro de pesquisa 'q' não encontrado" });
    }

    const searchedCasos = casosRepository.search(search);
    if (searchedCasos.length === 0) {
        return res.status(404).json({
            message: `Não foi possível encontrar casos que correspondam à pesquisa: ${search}.`,
        });
    }
    res.status(200).send(searchedCasos);
}

function postCaso(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;
    if (!agentesRepository.findById(agente_id)) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${agente_id}.`,
        });
    }

    const newCasoData = {
        titulo,
        descricao,
        status,
        agente_id,
    };
    const createdCaso = casosRepository.create(newCasoData);
    res.status(201).json(createdCaso);
}

function updateCaso(req, res) {
    const id = req.params.id;
    const { titulo, descricao, status, agente_id } = req.body;

    if (!casosRepository.findById(id)) {
        return res.status(404).json({
            message: `Não foi possível encontrar o caso de Id: ${id}.`,
        });
    }

    if (!agentesRepository.findById(agente_id)) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${agente_id}.`,
        });
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
    const { titulo, descricao, status, agente_id } = req.body;
    if (!titulo && !descricao && !status && !agente_id) {
        return res.status(400).json({
            message:
                'Pelo menos um dos campos titulo, descricao, status ou agente_id deve ser fornecido para atualizar um caso.',
        });
    }

    const caso = casosRepository.findById(id);
    if (!caso) {
        return res.status(404).json({
            message: `Não foi possível encontrar o caso de Id: ${id}.`,
        });
    }

    if (agente_id !== undefined && !agentesRepository.findById(agente_id)) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${agente_id}.`,
        });
    }

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
    const caso = casosRepository.findById(id);
    if (!caso) {
        return res.status(404).json({
            message: `Não foi possível encontrar o caso de Id: ${id}.`,
        });
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
