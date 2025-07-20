const agentesRepository = require('../repositories/agentesRepository');
const z = require('zod');

const idSchema = z.uuid("O 'id' deve ser um UUID válido");
const querySchema = z.object({
    cargo: z.enum(['inspetor', 'delegado']).optional(),
    sort: z.enum(['dataDeIncorporacao', '-dataDeIncorporacao']).optional(),
});

const agenteSchema = z.object({
    nome: z.string().min(1, "O campo 'nome' é obrigatório"),
    dataDeIncorporacao: z.string().refine(
        (dateStr) => {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return false;
            const today = new Date();
            return date <= today;
        },
        {
            message: "O campo 'dataDeIncorporacao' deve ser uma data válida e não pode ser futura",
        }
    ),
    cargo: z.enum(
        ['inspetor', 'delegado'],
        "O campo 'cargo' pode ser somente 'inspetor' ou 'delegado'"
    ),
});

function getAllAgentes(req, res, next) {
    try {
        const filters = querySchema.parse(req.query);
        const agentes = agentesRepository.findAll(filters.cargo, filters.sort);

        if (agentes.length === 0) {
            return res.status(204).send();
        }
        res.status(200).json(agentes);
    } catch (error) {
        return next(error);
    }
}

function getAgenteById(req, res, next) {
    try {
        const id = idSchema.parse(req.params.id);
        const agente = agentesRepository.findById(id);
        if (!agente) {
            return res
                .status(404)
                .send({ mensagem: `Não foi possível encontrar o agente de Id: ${id}` });
        }

        res.status(200).json(agente);
    } catch (error) {
        return next(error);
    }
}

function isValidDataDeIncorporacao(dataDeIncorporacao) {
    const date = new Date(dataDeIncorporacao);
    if (isNaN(date)) return false;

    const today = new Date();
    return date <= today;
}

function postAgente(req, res, next) {
    try {
        const { nome, dataDeIncorporacao, cargo } = agenteSchema.parse(req.body);

        const novoAgenteData = {
            nome: nome,
            dataDeIncorporacao: dataDeIncorporacao,
            cargo: cargo,
        };

        const createdAgente = agentesRepository.create(novoAgenteData);
        res.status(201).json(createdAgente);
    } catch (error) {
        next(error);
    }
}

function putAgente(req, res, next) {
    try {
        const id = req.params.id;
        const { nome, dataDeIncorporacao, cargo } = agenteSchema.required().parse(req.body);

        if ('id' in req.body) {
            return res.status(400).send({
                mensagem: "Não é permitido atualizar o campo 'id' do agente",
            });
        }
        if (!agentesRepository.findById(id)) {
            return res
                .status(404)
                .send({ mensagem: `Não foi possível encontrar o agente de Id: ${id}` });
        }

        const updatedAgenteData = {
            nome,
            dataDeIncorporacao,
            cargo,
        };

        const updatedAgente = agentesRepository.update(id, updatedAgenteData);
        res.status(200).json(updatedAgente);
    } catch (error) {
        return next(error);
    }
}

function patchAgente(req, res, next) {
    try {
        const id = req.params.id;
        const { nome, dataDeIncorporacao, cargo } = agenteSchema.partial().parse(req.body);

        if ('id' in req.body) {
            return res.status(400).send({
                mensagem: "Não é permitido atualizar o campo 'id' do agente",
            });
        }
        const agente = agentesRepository.findById(id);
        if (!agente) {
            return res
                .status(404)
                .send({ mensagem: `Não foi possível encontrar o agente de Id: ${id}` });
        }

        const updatedAgenteData = {
            nome: nome ?? agente.nome,
            dataDeIncorporacao: dataDeIncorporacao ?? agente.dataDeIncorporacao,
            cargo: cargo ?? agente.cargo,
        };

        const updatedAgente = agentesRepository.update(id, updatedAgenteData);
        res.status(200).json(updatedAgente);
    } catch (error) {
        return next(error);
    }
}

function deleteAgente(req, res) {
    const id = req.params.id;
    const existingAgente = agentesRepository.findById(id);

    if (!existingAgente) {
        return res.status(404).send({ mensagem: `Não foi possível deletar o agente de Id: ${id}` });
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
