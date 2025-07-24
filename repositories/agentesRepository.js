const { v4: uuid } = require('uuid');
const agentes = [];

function findAll() {
    return agentes;
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
    if (updatedAgenteData.id) {
        delete updatedAgenteData.id;
    }
    const agenteIndex = agentes.findIndex((c) => c.id === id);
    if (agenteIndex !== -1) {
        agentes[agenteIndex] = {
            ...agentes[agenteIndex],
            ...updatedAgenteData,
            id: agentes[agenteIndex].id,
        };
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
