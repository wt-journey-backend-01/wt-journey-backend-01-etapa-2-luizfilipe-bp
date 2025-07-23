const { v4: uuid } = require('uuid');
const agentes = [];

function findAll(cargo, sort) {
    return agentes
        .filter((agente) => (cargo?.trim() ? agente.cargo === cargo : true))
        .sort((a, b) => {
            const dateA = new Date(a.dataDeIncorporacao);
            const dateB = new Date(b.dataDeIncorporacao);

            if (sort === '-dataDeIncorporacao') {
                return dateB.getTime() - dateA.getTime();
            }
            if (sort === 'dataDeIncorporacao') {
                return dateA.getTime() - dateB.getTime();
            }
            return 0;
        });
}

function findById(id) {
    return agentes.find((c) => c.id === id);
}

function create(agente) {
    const createdAgente = { id: uuid(), ...agente };
    agentes.push(createdAgente);
    return createdAgente;
}

function update(id, updatedAgenteData) {
    const agenteIndex = agentes.findIndex((c) => c.id === id);
    if (agenteIndex !== -1) {
        agentes[agenteIndex] = { id: agentes[agenteIndex].id, ...updatedAgenteData };
        return agentes[agenteIndex];
    }
    return null;
}

function remove(id) {
    const agenteIndex = agentes.findIndex((c) => c.id === id);
    if (agenteIndex !== -1) {
        agentes.splice(agenteIndex, 1);
        return true;
    }
    return false;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
