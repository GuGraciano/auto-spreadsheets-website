document.getElementById('cadastroProfessorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio para validação

    // Campos obrigatórios
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const area = document.getElementById('area').value;
    const nivel = document.getElementById('nivel').value;
    const curso = document.getElementById('curso').value;

    // Verifica se todos os campos estão preenchidos
    if (nome && descricao && area && nivel && curso) {
        alert('Professor cadastrado com sucesso!');
        // Aqui você pode enviar os dados para o servidor
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});

// Pré-visualização da imagem
document.getElementById('imagem').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagemPreview').src = e.target.result;
            document.getElementById('imagemPreview').style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});
