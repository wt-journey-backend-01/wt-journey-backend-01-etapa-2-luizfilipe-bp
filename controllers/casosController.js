const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const z = require('zod');

const casoSchema = z.object({
    titulo: z.string().min(1, "O campo 'título' é obrigatório").partial(),
    descricao: z.string().min(1, "O campo 'descrição' é obrigatório").partial(),
    status: z
        .enum(
            ['aberto', 'solucionado'],
            "O campo 'status' pode ser somente 'aberto' ou 'solucionado'"
        )
        .partial(),
    agente_id: z.string().min(1, "O campo 'agente_id' é obrigatório").partial(),
});

function getAllCasos(req, res) {
    const agente_id = req.query.agente_id;
    const status = req.query.status;

    const casos = casosRepository.findAll(agente_id, status);
    if (casos.length === 0) {
        return res.status(204).send({ mensagem: 'Não há casos cadastrados' });
    }
    res.status(200).json(casos);
}

function getCasoById(req, res) {
    const id = req.params.id;
    const caso = casosRepository.findById(id);

    if (!caso) {
        return res.status(404).send({ mensagem: `Não foi possível encontrar o caso de Id: ${id}` });
    }
    res.status(200).json(caso);
}

function getAgenteByCaso(req, res) {
    const caso_id = req.params.caso_id;

    const caso = casosRepository.findById(caso_id);
    if (!caso) {
        return res
            .status(404)
            .send({ mensagem: `Não foi possível encontrar o caso de Id: ${caso_id}` });
    }

    const agente_id = caso.agente_id;
    const agente = agentesRepository.findById(agente_id);

    res.status(200).json(agente);
}

function searchCasos(req, res) {
    const search = req.query.q;

    const searchedCasos = casosRepository.search(search);
    res.status(200).send(searchedCasos);
}

function postCaso(req, res, next) {
    try {
        const { titulo, descricao, status, agente_id } = casoSchema.parse(req.body);

        if (!agentesRepository.findById(agente_id)) {
            return res
                .status(400)
                .send({ mensagem: `Não foi possível encontrar agente de Id: ${agente_id}` });
        }

        const createdCasoData = {
            titulo: titulo,
            descricao: descricao,
            status: status,
            agente_id: agente_id,
        };

        const createdCaso = casosRepository.create(createdCasoData);
        res.status(201).json(createdCaso);
    } catch (error) {
        return next(error);
    }
}

function updateCaso(req, res) {
    try {
        const id = req.params.id;
        if (!casosRepository.findById(id)) {
            return res
                .status(404)
                .send({ mensagem: `Não foi possível encontrar o caso de Id: ${id}` });
        }

        if ('id' in req.body) {
            return res
                .status(400)
                .send({ mensagem: "Não é permitido atualizar o campo 'id' dos casos" });
        }

        const { titulo, descricao, status, agente_id } = casoSchema.parse(req.body);
        if (!agentesRepository.findById(agente_id)) {
            return res
                .status(400)
                .send({ mensagem: `Não foi possível encontrar agente de Id: ${agente_id}` });
        }

        const updatedCasoData = {
            titulo,
            descricao,
            status,
            agente_id,
        };

        const updatedCaso = casosRepository.update(id, updatedCasoData);
        res.status(200).json(updatedCaso);
    } catch (error) {
        return next(error);
    }
}

function patchCaso(req, res) {
    try {
        const id = req.params.id;
        const caso = casosRepository.findById(id);
        if (!caso) {
            return res
                .status(404)
                .send({ mensagem: `Não foi possível encontrar o caso de Id: ${id}` });
        }

        if ('id' in req.body) {
            return res
                .status(400)
                .send({ mensagem: "Não é permitido atualizar o campo 'id' dos casos" });
        }

        const { titulo, descricao, status, agente_id } = casoSchema.partial().parse(req.body);
        if (!agentesRepository.findById(agente_id)) {
            return res
                .status(400)
                .send({ mensagem: `Não foi possível encontrar agente de Id: ${agente_id}` });
        }

        const patchedCasoData = {
            titulo: titulo ?? caso.titulo,
            descricao: descricao ?? caso.descricao,
            status: status ?? caso.status,
            agente_id: agente_id ?? caso.agente_id,
        };

        const patchedCaso = casosRepository.update(id, patchedCasoData);
        res.status(200).json(patchedCaso);
    } catch (error) {
        return next(error);
    }
}

function deleteCaso(req, res) {
    const id = req.params.id;
    const caso = casosRepository.findById(id);

    if (!caso) {
        return res.status(404).json({ mensagem: `Não foi possível deletar o caso de Id ${id}` });
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
