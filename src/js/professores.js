// Seletores
const input = document.querySelector(".search-input");
const professorCards = document.querySelectorAll(".professor-card");
const areaSelect = document.querySelector("#area");
const cursoSelect = document.querySelector("#curso");

// Função de filtro
function filterProfessors() {
    const searchText = input.value.toLowerCase();
    const selectedArea = areaSelect.value;
    const selectedCurso = cursoSelect.value;

    professorCards.forEach(card => {
        // Pegando o título e descrição do professor
        const title = card.querySelector(".professor-title").textContent.toLowerCase();
        const description = card.querySelector(".professor-description").textContent.toLowerCase();

        // Pegando classes do card para filtrar por área e curso
        const areaClass = card.querySelector("div").classList.contains(selectedArea) || selectedArea === "todas";
        const cursoClass = card.querySelector("div").classList.contains(selectedCurso) || selectedCurso === "todos";

        // Verifica se o texto da busca coincide com o nome ou descrição
        const matchesSearch = title.includes(searchText) || description.includes(searchText);
        const matchesFilters = areaClass && cursoClass;

        // Exibe ou oculta o professor com base na combinação de filtros e busca
        if (matchesSearch && matchesFilters) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Adicionando eventos de filtro e pesquisa
window.onload = () => {
    input.addEventListener("input", filterProfessors);
    areaSelect.addEventListener("change", filterProfessors);
    cursoSelect.addEventListener("change", filterProfessors);
};
