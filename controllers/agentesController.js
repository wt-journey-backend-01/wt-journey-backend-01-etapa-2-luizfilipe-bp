const agentesRepository = require('../repositories/agentesRepository');

function dateFormatIsValid(dateString) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

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
        agentes = agentes.sort((a, b) => {
            const dateA = new Date(a.dataDeIncorporacao);
            const dateB = new Date(b.dataDeIncorporacao);

            if (sort === '-dataDeIncorporacao') {
                return dateB.getTime() - dateA.getTime();
            } else if (sort === 'dataDeIncorporacao') {
                return dateA.getTime() - dateB.getTime();
            }
            return 0;
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
    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({
            message:
                'Os campos nome, dataDeIncorporacao e cargo são obrigatórios para adicionar um agente.',
        });
    }

    if (!dateFormatIsValid(dataDeIncorporacao)) {
        return res.status(400).json({
            message: "O campo 'dataDeIncorporacao' deve estar no formato 'YYYY-MM-DD'.",
        });
    }
    if (isNaN(data.getTime())) {
        return res.status(400).json({
            message: "O campo 'dataDeIncorporacao' deve ser uma data válida.",
        });
    }
    if (new Date(dataDeIncorporacao) > new Date()) {
        return res.status(400).json({
            message: "O campo 'dataDeIncorporacao' não pode ser uma data futura.",
        });
    }

    const newAgenteData = {
        nome,
        dataDeIncorporacao,
        cargo,
    };

    const createdAgente = agentesRepository.create(newAgenteData);
    res.status(201).json(createdAgente);
}

function putAgente(req, res) {
    if ('id' in req.body) {
        return res.status(400).json({
            message: "O campo 'id' não pode ser atualizado.",
        });
    }

    const id = req.params.id;
    const agente = agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${id}.`,
        });
    }

    const { nome, dataDeIncorporacao, cargo } = req.body;
    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({
            message:
                'Os campos nome, dataDeIncorporacao e cargo são obrigatórios para atualizar um agente.',
        });
    }

    if (!dateFormatIsValid(dataDeIncorporacao)) {
        return res.status(400).json({
            message: "O campo 'dataDeIncorporacao' deve estar no formato 'YYYY-MM-DD'.",
        });
    }
    if (isNaN(data.getTime())) {
        return res.status(400).json({
            message: "O campo 'dataDeIncorporacao' deve ser uma data válida.",
        });
    }
    if (new Date(dataDeIncorporacao) > new Date()) {
        return res.status(400).json({
            message: "O campo 'dataDeIncorporacao' não pode ser uma data futura.",
        });
    }

    const updatedAgenteData = {
        nome,
        dataDeIncorporacao,
        cargo,
    };
    const updatedAgente = agentesRepository.update(id, updatedAgenteData);
    res.status(200).json(updatedAgente);
}

function patchAgente(req, res) {
    if ('id' in req.body) {
        return res.status(400).json({
            message: "O campo 'id' não pode ser atualizado.",
        });
    }

    const id = req.params.id;
    const agente = agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${id}.`,
        });
    }

    const { nome, dataDeIncorporacao, cargo } = req.body;
    if (nome === undefined && dataDeIncorporacao === undefined && cargo === undefined) {
        return res.status(400).json({
            message: 'Deve haver pelo menos um campo para realizar a atualização de agente',
        });
    }

    if (dataDeIncorporacao !== undefined) {
        if (!dateFormatIsValid(dataDeIncorporacao)) {
            return res.status(400).json({
                message: "O campo 'dataDeIncorporacao' deve estar no formato 'YYYY-MM-DD'.",
            });
        }
        if (isNaN(data.getTime())) {
            return res.status(400).json({
                message: "O campo 'dataDeIncorporacao' deve ser uma data válida.",
            });
        }
        if (new Date(dataDeIncorporacao) > new Date()) {
            return res.status(400).json({
                message: "O campo 'dataDeIncorporacao' não pode ser uma data futura.",
            });
        }
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
