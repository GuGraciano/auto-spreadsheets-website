// src/js/cadastro-professores.js

document.getElementById('cadastroProfessorForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Pegando os valores dos campos
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const area = document.getElementById('area').value;
    const nivel = document.getElementById('nivel').value;
    const curso = document.getElementById('curso').value;
    const imagem = document.getElementById('imagem').files[0];

    // Simulação de envio do formulário
    alert(`Professor ${nome} cadastrado com sucesso!\nÁrea: ${area}\nNível: ${nivel}\nCurso: ${curso}`);
    
    // Aqui você pode adicionar o código para enviar os dados para o servidor, se necessário.
    
    // Após o envio, você pode limpar o formulário
    this.reset();
});
