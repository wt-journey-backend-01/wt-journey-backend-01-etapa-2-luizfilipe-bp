const { v4: uuid } = require('uuid');
const agentes = [];

function findAll(cargo, sort) {
    let retrievedAgentes = [...agentes];
    if (cargo) {
        retrievedAgentes = agentes.filter((agente) => agente.cargo === cargo);
    }

    if (sort === 'dataDeIncorporacao' || sort === '-dataDeIncorporacao') {
        retrievedAgentes.sort((a, b) => {
            const dateA = new Date(a.dataDeIncorporacao);
            const dateB = new Date(b.dataDeIncorporacao);
            if (sort === '-dataDeIncorporacao') {
                return dateB - dateA;
            }
            return dateA - dateB;
        });
    }
    return retrievedAgentes;
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
    if (agenteIndex === -1) {
        return null;
    }
    agentes[agenteIndex] = { id: agentes[agenteIndex].id, ...updatedAgenteData };
    return agentes[agenteIndex];
}

function remove(id) {
    const agenteIndex = agentes.findIndex((c) => c.id === id);
    if (agenteIndex !== -1) {
        agentes.splice(agenteIndex, 1);
    }
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
