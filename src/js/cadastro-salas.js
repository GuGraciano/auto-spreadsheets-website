document.getElementById("room-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Pegando os valores do formulário
    const nome = document.getElementById("room-name").value;
    const descricao = document.getElementById("room-description").value;
    const capacidade = document.getElementById("room-capacity").value;
    const equipamentos = Array.from(document.getElementById("room-equipment").selectedOptions).map(option => option.value).join(', ');
    const data = document.getElementById("room-date").value;
    const aula = document.getElementById("room-class").value;

    // Validação simples
    if (nome && descricao && capacidade && data && aula) {
        alert(`Sala "${nome}" cadastrada com sucesso!\nEquipamentos: ${equipamentos}\nData: ${data}\nAula: ${aula}`);
        // Aqui, você pode enviar os dados para um servidor ou salvar localmente.
    } else {
        alert("Por favor, preencha todos os campos!");
    }
});
