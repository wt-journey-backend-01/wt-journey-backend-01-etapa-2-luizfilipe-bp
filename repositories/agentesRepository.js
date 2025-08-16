const { v4: uuid } = require('uuid');
const agentes = [];

function findAll(filters, sort) {
    let results = agentes;

    if (filters.cargo) {
        results = results.filter((agente) => agente.cargo === filters.cargo);
    }

    if (sort) {
        results.sort((a, b) => {
            const dateA = new Date(a.dataDeIncorporacao).getTime();
            const dateB = new Date(b.dataDeIncorporacao).getTime();
            return sort === 'dataDeIncorporacao' ? dateA - dateB : dateB - dateA;
        });
    }

    return results;
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
