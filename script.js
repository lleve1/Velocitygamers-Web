document.addEventListener('DOMContentLoaded', () => {
    const genBtn = document.getElementById('gen-btn');
    const iaInput = document.getElementById('ia-input');

    genBtn.addEventListener('click', () => {
        const query = iaInput.value.trim();
        if (query !== "") {
            alert("VELOCITY IA: Analizando '" + query + "' para tu setup.");
            iaInput.value = "";
        } else {
            alert("Escribe algo para Velocity IA.");
        }
    });
});