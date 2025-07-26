const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');
const { validateSchema } = require('../utils/validateSchema');
const {
    agentesPostSchema,
    agentesPutSchema,
    agentesPatchSchema,
    agentesFilterSchema,
    idParamSchema,
} = require('../utils/schemaValidator');

/**
 * @swagger
 * tags:
 *   - name: Agentes
 *     description: Rota de gerenciamento de agentes do Departamento de Polícia.
 */

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Retorna uma lista de agentes
 *     tags: [Agentes]
 *     parameters:
 *       - in: query
 *         name: cargo
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra agentes pelo cargo
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: string
 *           enum: [dataDeIncorporacao, -dataDeIncorporacao]
 *         description: Ordena a lista de agentes por data de incorporação (ascendente ou descendente)
 *     responses:
 *       200:
 *         description: Lista de agentes
 *       400:
 *         description: Erro de validação dos parâmetros de filtro
 *       404:
 *         description: Nenhum agente encontrado com os filtros fornecidos
 *       500:
 *         description: Erro interno do servidor ao tentar buscar os agentes
 */
router.get('/', validateSchema(agentesFilterSchema, 'query'), agentesController.getAllAgentes);

/**
 * @swagger
 * /agentes/{id}:
 *   get:
 *     summary: Retorna um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Detalhes do agente
 *       404:
 *         description: Agente não encontrado
 *       500:
 *         description: Erro interno do servidor ao tentar buscar o agente
 */
router.get('/:id', validateSchema(idParamSchema, 'params'), agentesController.getAgenteById);

/**
 * @swagger
 * /agentes:
 *   post:
 *     summary: Cria um novo agente
 *     tags: [Agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, dataDeIncorporacao, cargo]
 *             properties:
 *               nome:
 *                 type: string
 *               dataDeIncorporacao:
 *                 type: string
 *               cargo:
 *                 type: string
 *                 enum: [inspetor, delegado]
 *     responses:
 *       201:
 *         description: Agente criado com sucesso
 *       400:
 *         description: Erro de validação dos dados do agente
 *       500:
 *         description: Erro interno do servidor ao tentar criar o agente
 */
router.post('/', validateSchema(agentesPostSchema, 'body'), agentesController.postAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   put:
 *     summary: Atualiza um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, dataDeIncorporacao, cargo]
 *             properties:
 *               nome:
 *                 type: string
 *               dataDeIncorporacao:
 *                 type: string
 *               cargo:
 *                 type: string
 *                 enum: [inspetor, delegado]
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *       400:
 *         description: Erro de validação dos dados do agente
 *       404:
 *         description: Agente não encontrado
 *       500:
 *         description: Erro interno do servidor ao tentar atualizar o agente
 */
router.put(
    '/:id',
    validateSchema(idParamSchema, 'params'),
    validateSchema(agentesPutSchema, 'body'),
    agentesController.putAgente
);

/**
 * @swagger
 * /agentes/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               dataDeIncorporacao:
 *                 type: string
 *               cargo:
 *                 type: string
 *                 enum: [inspetor, delegado]
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *       400:
 *         description: Erro de validação dos dados do agente
 *       404:
 *         description: Agente não encontrado
 *       500:
 *         description: Erro interno do servidor ao tentar atualizar o agente
 */
router.patch(
    '/:id',
    validateSchema(idParamSchema, 'params'),
    validateSchema(agentesPatchSchema, 'body'),
    agentesController.patchAgente
);

/**
 * @swagger
 * /agentes/{id}:
 *   delete:
 *     summary: Deleta um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Agente deletado com sucesso
 *       404:
 *         description: Agente não encontrado
 *       500:
 *         description: Erro interno do servidor ao tentar deletar o agente
 */
router.delete('/:id', validateSchema(idParamSchema, 'params'), agentesController.deleteAgente);

module.exports = router;
