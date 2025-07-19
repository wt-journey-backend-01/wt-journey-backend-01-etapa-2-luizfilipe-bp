const agentesRepository = require('../repositories/agentesRepository');

function getAllAgentes(req, res) {
    const cargo = req.query.cargo;
    const sort = req.query.sort;

    let agentes = agentesRepository.findAll(cargo, sort);
    if (agentes.length === 0) {
        return res.status(204).send();
    }
    res.json(agentes);
}

function getAgenteById(req, res) {
    const id = req.params.id;
    const agente = agentesRepository.findById(id);

    if (!agente) {
        return res
            .status(404)
            .send({ messagem: `Não foi possível encontrar o agente de Id: ${id}` });
    }

    res.json(agente);
}

function postAgente(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;

    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).send({ mensagem: 'Todos os campos são obrigatórios' });
    }

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
    const { nome, dataDeIncorporacao, cargo } = req.body;

    const existingAgente = agentesRepository.findById(id);
    if (!existingAgente) {
        return res
            .status(404)
            .send({ mensagem: `Não foi possível encontrar o agente de Id: ${id}` });
    }

    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).send({ mensagem: 'Todos os campos são obrigatórios' });
    }

    const updatedAgenteData = {
        nome,
        dataDeIncorporacao,
        cargo,
    };

    const updatedAgente = agentesRepository.update(id, updatedAgenteData);
    res.json(updatedAgente);
}

function patchAgente(req, res) {
    const id = req.params.id;
    const { nome, dataDeIncorporacao, cargo } = req.body;

    const existingAgente = agentesRepository.findById(id);
    if (!existingAgente) {
        return res
            .status(404)
            .send({ mensagem: `Não foi possível encontrar o agente de Id: ${id}` });
    }

    if (!nome && !dataDeIncorporacao && !cargo) {
        return res
            .status(400)
            .send({ mensagem: 'É necessário informar pelo menos um campo para atualização' });
    }

    const updatedAgenteData = {
        nome: nome || existingAgente.nome,
        dataDeIncorporacao: dataDeIncorporacao || existingAgente.dataDeIncorporacao,
        cargo: cargo || existingAgente.cargo,
    };

    const updatedAgente = agentesRepository.update(id, updatedAgenteData);
    res.json(updatedAgente);
}

function deleteAgente(req, res) {
    const id = req.params.id;
    const existingAgente = agentesRepository.findById(id);

    if (!existingAgente) {
        return res.status(404).send({ mensagem: `Não foi possível deletar o agente de Id: ${id}` });
    }

    const deletedAgente = agentesRepository.remove(id);
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
