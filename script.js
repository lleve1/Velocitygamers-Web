// ========== MODO OSCURO/CLARO ==========
const toggleBtn = document.getElementById('darkModeToggle');
const body = document.body;
const icon = toggleBtn.querySelector('i');

// Cargar preferencia guardada
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    // Cambia el icono
    icon.classList.toggle('fa-moon', !isLight);
    icon.classList.toggle('fa-sun', isLight);
});

// ========== VELOCITY IA (BUSCADOR INTELIGENTE) ==========
const iaForm = document.getElementById('ia-form');
const iaInput = document.getElementById('ia-input');
const iaResponse = document.getElementById('ia-response');

iaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = iaInput.value.trim();
    if (!query) return;

    // Mostrar "pensando..."
    iaResponse.style.display = 'block';
    iaResponse.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Velocity IA analizando...';

    // Simular respuesta
    await fakeIARequest(query);
});

async function fakeIARequest(query) {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const q = query.toLowerCase();
    let respuesta = '';

    if (q.includes('procesador') || q.includes('cpu')) {
        respuesta = `🔥 <strong>Recomendación Velocity IA:</strong><br>
        - Intel Core i9-13900K (24 núcleos) – $589<br>
        - AMD Ryzen 9 7950X3D – $699<br>
        <em>Perfectos para gaming extremo y streaming.</em>`;
    } else if (q.includes('laptop') || q.includes('portátil')) {
        respuesta = `💻 <strong>Top Laptops Gamer:</strong><br>
        - ASUS ROG Zephyrus G14 (RTX 4060) – $1,599<br>
        - Lenovo Legion Pro 5 – $1,799<br>
        <em>Ligereza y potencia en uno.</em>`;
    } else if (q.includes('teclado') || q.includes('ratón') || q.includes('periférico')) {
        respuesta = `⌨️ <strong>Periféricos Velocity:</strong><br>
        - Teclado mecánico HyperX Alloy Origins – $110<br>
        - Mouse Logitech G Pro X Superlight – $150<br>
        <em>La velocidad en tus manos.</em>`;
    } else if (q.includes('gear') || q.includes('velocity')) {
        respuesta = `🛡️ <strong>Velocity Gear Oficial:</strong><br>
        - Playeras, hoodies y accesorios con el logo del escudo.<br>
        <em>Próximamente en la tienda.</em>`;
    } else {
        respuesta = `🤖 Velocity IA sugiere:<br>
        Prueba con palabras clave como "procesador", "laptop", "teclado" o "gear".<br>
        ¡Estoy aprendiendo cada día!`;
    }

    iaResponse.innerHTML = respuesta;
}