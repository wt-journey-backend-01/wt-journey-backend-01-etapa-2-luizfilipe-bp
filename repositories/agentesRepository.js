const { v4: uuid } = require('uuid');
const agentes = [];

function findAll(cargo, sort) {
    let retrievedAgentes = [...agentes];
    if (cargo) {
        retrievedAgentes = agentes.filter((agente) => agente.cargo === cargo);
    }

    if (sort === 'dataDeIncorporacao' || sort === '-dataDeIncorporacao') {
        retrievedAgentes.sort((a, b) => {
            if (sort === '-dataDeIncorporacao') {
                return b.dataDeIncorporacao.localeCompare(a.dataDeIncorporacao);
            }
            return a.dataDeIncorporacao.localeCompare(b.dataDeIncorporacao);
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
    agentes[agenteIndex] = { id: agentes[agenteIndex].id, ...updatedAgenteData };
    return agentes[agenteIndex];
}

function remove(id) {
    const agenteIndex = agentes.findIndex((c) => c.id === id);
    agentes.splice(agenteIndex, 1);
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
