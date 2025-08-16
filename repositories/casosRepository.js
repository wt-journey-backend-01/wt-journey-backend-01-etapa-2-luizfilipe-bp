const { v4: uuid } = require('uuid');
const casos = [];
function findAll(filters) {
    let results = casos;

    if (filters.status) {
        results = results.filter((caso) => caso.status === filters.status);
    }

    if (filters.agente_id) {
        results = results.filter((caso) => caso.agente_id === filters.agente_id);
    }

    return results;
}

function findById(id) {
    return casos.find((c) => c.id === id);
}

function create(caso) {
    const createdCaso = { id: uuid(), ...caso };
    casos.push(createdCaso);
    return createdCaso;
}

function update(id, updatedCasoData) {
    const casoIndex = casos.findIndex((c) => c.id === id);
    if (casoIndex !== -1) {
        casos[casoIndex] = {
            ...casos[casoIndex],
            ...updatedCasoData,
            id: casos[casoIndex].id,
        };
        return casos[casoIndex];
    }
    return null;
}

function remove(id) {
    const casoIndex = casos.findIndex((c) => c.id === id);
    if (casoIndex !== -1) {
        casos.splice(casoIndex, 1);
        return true;
    }
    return false;
}

function search(search) {
    search = search.trim().toLowerCase();
    return casos.filter((caso) => {
        return (
            caso.titulo.toLowerCase().includes(search) ||
            caso.descricao.toLowerCase().includes(search)
        );
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    search,
};
