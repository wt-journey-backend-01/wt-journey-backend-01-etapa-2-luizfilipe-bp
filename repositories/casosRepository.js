const { v4: uuid } = require('uuid');
const casos = [];
function findAll(agente_id, status) {
	return casos.filter((caso) => {
		const filtraPorAgente = agente_id?.trim() ? caso.agente_id === agente_id : true;
		const filtraPorStatus = status?.trim() ? caso.status === status : true;
		return filtraPorAgente && filtraPorStatus;
	});
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
        casos[casoIndex] = { id: casos[casoIndex].id, ...updatedCasoData };
        return casos[casoIndex];
    }
    return null;
}

function remove(id) {
    const casoIndex = casos.findIndex((c) => c.id === id);
    if (casoIndex !== -1) {
        casos.splice(casoIndex, 1);
    }
}

function search(search) {
    if (!search || !search.trim()) {
        return casos;
    }

    const terms = search.trim().toLowerCase().split(/\s+/);

    return casos.filter((caso) => {
        const text = `${caso.titulo} ${caso.descricao}`.toLowerCase();
        return terms.every(term => text.includes(term));
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