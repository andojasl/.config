(function() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const preview = document.getElementById('preview');

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        dropZone.classList.remove('drag-over');
        const file = event.dataTransfer.files[0];
        if (file) {
            previewImage(file);
        }
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            previewImage(file);
        }
    });

    function previewImage(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            preview.innerHTML = `<img src="${reader.result}" alt="Uploaded Image">`;
        };
    }
})();
