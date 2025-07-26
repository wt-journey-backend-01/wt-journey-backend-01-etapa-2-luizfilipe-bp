const z = require('zod');

const agentesBaseSchema = z.object({
    nome: z
        .string("O campo 'nome' deve ser uma string.")
        .min(1, "O campo 'nome' do agente é obrigatório."),
    dataDeIncorporacao: z
        .string("O campo 'dataDeIncorporacao' deve ser uma string.")
        .pipe(
            z
                .string()
                .regex(
                    /^\d{4}-\d{2}-\d{2}$/,
                    "O campo 'dataDeIncorporacao' deve estar no formato 'YYYY-MM-DD'."
                )
        )
        .pipe(
            z.string().refine((date) => {
                const parsed = new Date(date);
                return !isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
            }, "O campo 'dataDeIncorporacao' deve ser uma data válida.")
        )
        .pipe(
            z.string().refine((date) => {
                const parsed = new Date(date);
                return parsed <= new Date();
            }, "O campo 'dataDeIncorporacao' não pode ser uma data futura.")
        ),
    cargo: z.enum(['inspetor', 'delegado'], "O campo 'cargo' deve ser 'inspetor' ou 'delegado'."),
});

const agentesPostSchema = agentesBaseSchema.strip();
const agentesPutSchema = agentesBaseSchema.strip();
const agentesPatchSchema = agentesBaseSchema.partial();

const casosBaseSchema = z.object({
    titulo: z
        .string("O campo 'titulo' deve ser uma string.")
        .min(1, "O campo 'titulo' é obrigatório"),
    descricao: z
        .string("O campo 'descricao' deve ser uma string.")
        .min(1, { message: "O campo 'descricao' do caso é obrigatório." }),
    status: z.enum(['solucionado', 'aberto'], {
        message: "O campo 'status' deve ser 'solucionado' ou 'aberto'.",
    }),
    agente_id: z.uuid("O campo 'agenteId' deve ser um UUID válido."),
});

const casosPostSchema = casosBaseSchema.strip();
const casosPutSchema = casosBaseSchema.strip();
const casosPatchSchema = casosBaseSchema.partial();

module.exports = {
    agentesPostSchema,
    agentesPutSchema,
    agentesPatchSchema,
    casosPostSchema,
    casosPutSchema,
    casosPatchSchema,
};
