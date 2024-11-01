document.getElementById('imagem').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('imagemPreview');
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
