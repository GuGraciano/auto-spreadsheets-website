const input = document.querySelector(".search-input");
const courseCards = document.querySelectorAll(".course-card");
const areaSelect = document.querySelector("#area");
const nivelSelect = document.querySelector("#nivel");
const modalidadeSelect = document.querySelector("#modalidade");

window.onload = () => {
    input.addEventListener("input", filterCourses);
    areaSelect.addEventListener("change", filterCourses);
    nivelSelect.addEventListener("change", filterCourses);
    modalidadeSelect.addEventListener("change", filterCourses);
};

function filterCourses() {
    const searchText = input.value.toLowerCase();
    const selectedArea = areaSelect.value;
    const selectedNivel = nivelSelect.value;
    const selectedModalidade = modalidadeSelect.value;

    courseCards.forEach(card => {
        const title = card.querySelector(".course-title").textContent.toLowerCase();
        const description = card.querySelector(".course-description").textContent.toLowerCase();
        const areaClass = card.querySelector("div").classList.contains(selectedArea) || selectedArea === "todas";
        const nivelClass = card.querySelector("div").classList.contains(selectedNivel) || selectedNivel === "todos";
        const modalidadeClass = card.querySelector("div").classList.contains(selectedModalidade) || selectedModalidade === "todas";

        // Verifica todos os filtros
        const matchesSearch = title.includes(searchText) || description.includes(searchText);
        const matchesFilters = areaClass && nivelClass && modalidadeClass;

        if (matchesSearch && matchesFilters) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
