document.querySelector('.manage-equipment-btn').addEventListener('click', function() {
    window.location.href = 'gerenciar-maquinario.html';
});

document.querySelector('.cancel-btn').addEventListener('click', function() {
    window.location.href = 'salas.html';
});

document.querySelector('.save-btn').addEventListener('click', function() {
    alert('Informações salvas com sucesso!');
    window.location.href = 'salas.html';
});
