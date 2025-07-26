const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');
const validateUUIDParam = require('../utils/validateUUIDParam');
const { casosPostSchema, casosPutSchema, casosPatchSchema } = require('../utils/schemaValidator');
const { validateSchema } = require('../utils/validateSchema');

/**
 * @swagger
 * tags:
 *   - name: Casos
 *     description: Rota de gerenciamento de casos do Departamento de Polícia.
 */

/**
 * @swagger
 * /casos/search:
 *   get:
 *     summary: Retorna uma lista de casos por busca textual
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: false
 *         schema:
 *           type: string
 *         description: Texto de busca
 *     responses:
 *       200:
 *         description: Lista de casos
 *       400:
 *         description: Erro de validação dos parâmetros de filtro
 *       404:
 *         description: Nenhum caso encontrado com os filtros fornecidos
 *       500:
 *         description: Erro interno do servidor ao tentar buscar os casos
 */
router.get('/search', casosController.searchCasos);

/**
 * @swagger
 * /casos/{id}/agente:
 *   get:
 *     summary: Retorna o agente associado a um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Agente associado ao caso encontrado
 *       404:
 *         description: Caso não encontrado ou agente não associado
 *       500:
 *         description: Erro interno do servidor ao tentar buscar o agente associado ao caso
 */
router.get('/:id/agente', validateUUIDParam, casosController.getAgenteByCaso);

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Retorna uma lista de casos
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [solucionado, aberto]
 *         description: Filtra por status do caso
 *       - in: query
 *         name: agente_id
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtra por ID do agente associado
 *     responses:
 *       200:
 *         description: Lista de casos
 *       400:
 *         description: Erro de validação dos parâmetros de filtro
 *       404:
 *         description: Nenhum caso encontrado com os filtros fornecidos
 *       500:
 *         description: Erro interno do servidor ao tentar buscar os casos
 */
router.get('/', casosController.getAllCasos);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Retorna um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Detalhes do caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro interno do servidor ao tentar buscar o caso
 */
router.get('/:id', validateUUIDParam, casosController.getCasoById);

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Cria um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, descricao, status, agente_id]
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do caso
 *               descricao:
 *                 type: string
 *                 description: Descrição do caso
 *               status:
 *                 type: string
 *                 enum: [solucionado, aberto]
 *                 description: Status do caso
 *               agente_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID do agente associado ao caso
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 *       400:
 *         description: Erro de validação dos dados do caso
 *       500:
 *         description: Erro interno do servidor ao tentar criar o caso
 */
router.post('/', validateSchema(casosPostSchema), casosController.postCaso);

/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Atualiza um caso pelo ID
 *     tags: [Casos]
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
 *             required: [titulo, descricao, status, agente_id]
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [solucionado, aberto]
 *               agente_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *       400:
 *         description: Erro de validação dos dados do caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro interno do servidor ao tentar atualizar o caso
 */
router.put('/:id', validateUUIDParam, validateSchema(casosPutSchema), casosController.updateCaso);

/**
 * @swagger
 * /casos/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um caso pelo ID
 *     tags: [Casos]
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
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [solucionado, aberto]
 *               agente_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *       400:
 *         description: Erro de validação dos dados do caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro interno do servidor ao tentar atualizar o caso
 */
router.patch(
    '/:id',
    validateUUIDParam,
    validateSchema(casosPatchSchema),
    casosController.patchCaso
);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Deleta um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Caso deletado com sucesso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro interno do servidor ao tentar deletar o caso
 */
router.delete('/:id', validateUUIDParam, casosController.deleteCaso);

module.exports = router;
