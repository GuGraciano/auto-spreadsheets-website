const input = document.querySelector(".search-input");
const roomCards = document.querySelectorAll(".room-card");
const cursoSelect = document.querySelector("#curso");
const disponibilidadeSelect = document.querySelector("#disponibilidade");
const maquinarioSelect = document.querySelector("#maquinario");

window.onload = () => {
    // Adicionando eventos aos campos de busca e filtro
    input.addEventListener("input", filterRooms);
    cursoSelect.addEventListener("change", filterRooms);
    disponibilidadeSelect.addEventListener("change", filterRooms);
    maquinarioSelect.addEventListener("change", filterRooms);
};

function filterRooms() {
    const searchText = input.value.toLowerCase();
    const selectedCurso = cursoSelect.value;
    const selectedDisponibilidade = disponibilidadeSelect.value;
    const selectedMaquinario = maquinarioSelect.value;

    roomCards.forEach(card => {
        // Pegando o título e a descrição da sala
        const title = card.querySelector(".room-title").textContent.toLowerCase();
        const description = card.querySelector(".room-description").textContent.toLowerCase();

        // Verificando se os filtros correspondem às classes no div
        const cursoClass = card.querySelector("div").classList.contains(selectedCurso) || selectedCurso === "todos";
        const disponibilidadeClass = card.querySelector("div").classList.contains(selectedDisponibilidade) || selectedDisponibilidade === "todos";
        const maquinarioClass = card.querySelector("div").classList.contains(selectedMaquinario) || selectedMaquinario === "todos";

        // Verifica se o texto da busca coincide com o título ou descrição
        const matchesSearch = title.includes(searchText) || description.includes(searchText);
        const matchesFilters = cursoClass && disponibilidadeClass && maquinarioClass;

        // Exibe ou oculta a sala com base na combinação de filtros e busca
        if (matchesSearch && matchesFilters) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
