const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuid } = require('uuid');

function getAllAgentes(req, res) {
    const cargo = req.query.cargo;
    const sort = req.query.sort;

    let agentes = agentesRepository.findAll();

    if (cargo) {
        agentes = agentes.filter((agente) => agente.cargo === cargo);
        if (agentes.length === 0) {
            return res.status(404).json({
                message: `Não foi possível encontrar agentes com o cargo: ${cargo}.`,
            });
        }
    }

    if (sort === 'dataDeIncorporacao' || sort === '-dataDeIncorporacao') {
        agentes.sort((a, b) => {
            const dateA = new Date(a.dataDeIncorporacao).getTime();
            const dateB = new Date(b.dataDeIncorporacao).getTime();
            return sort === 'dataDeIncorporacao' ? dateA - dateB : dateB - dateA;
        });
    }
    res.status(200).json(agentes);
}

function getAgenteById(req, res) {
    const id = req.params.id;
    const agente = agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${id}.`,
        });
    }
    res.status(200).json(agente);
}

function postAgente(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;

    const newAgenteData = {
        id: uuid(),
        nome,
        dataDeIncorporacao,
        cargo,
    };

    const createdAgente = agentesRepository.create(newAgenteData);
    res.status(201).json(createdAgente);
}

function putAgente(req, res) {
    const id = req.params.id;
    const agente = agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${id}.`,
        });
    }
    const { nome, dataDeIncorporacao, cargo } = req.body;

    const updatedAgenteData = {
        nome,
        dataDeIncorporacao,
        cargo,
    };
    const updatedAgente = agentesRepository.update(id, updatedAgenteData);
    res.status(200).json(updatedAgente);
}

function patchAgente(req, res) {
    const id = req.params.id;
    const agente = agentesRepository.findById(id);
    const { nome, dataDeIncorporacao, cargo } = req.body;

    if (!agente) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${id}.`,
        });
    }
    if (!nome && !dataDeIncorporacao && !cargo) {
        return res.status(400).json({
            message:
                'Deve haver pelo menos um campo (nome, dataDeIncorporacao ou cargo) para atualizar.',
        });
    }

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
    const agente = agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${id}.`,
        });
    }

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
};
