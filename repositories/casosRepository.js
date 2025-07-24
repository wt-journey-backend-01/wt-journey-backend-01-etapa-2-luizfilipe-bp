const { v4: uuid } = require('uuid');
const casos = [];
function findAll() {
    return casos;
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
    const terms = search.trim().toLowerCase().split(/\s+/);
    return casos.filter((caso) => {
        const text = `${caso.titulo} ${caso.descricao}`.toLowerCase();
        return terms.every((term) => text.includes(term));
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
