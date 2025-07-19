const { v4: uuid } = require('uuid');
const casos = [];
function findAll(agente_id, status) {
    let retrieviedCasos = [...casos];

    if (agente_id) {
        retrieviedCasos = retrieviedCasos.filter((caso) => caso.agente_id === agente_id);
    }

    if (status) {
        retrieviedCasos = retrieviedCasos.filter((caso) => caso.status === status);
    }
    return retrieviedCasos;
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
    casos[casoIndex] = { id: casos[casoIndex].id, ...updatedCasoData };
    return casos[casoIndex];
}

function remove(id) {
    const casoIndex = casos.findIndex((c) => c.id === id);
    casos.splice(casoIndex, 1);
}

function search(search) {
    if (!search) {
        return casos;
    }

    search = search.trim();
    if (search.length === 0) {
        return casos;
    }

    search = search.toLowerCase();
    const filteredCasos = casos.filter((caso) => {
        console.log(caso);
        return (
            caso.titulo.toLowerCase().includes(search) ||
            caso.descricao.toLowerCase().includes(search)
        );
    });

    return filteredCasos;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    search,
};
