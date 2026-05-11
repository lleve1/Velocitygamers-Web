// ========== MODO OSCURO / CLARO ==========
const darkBtn = document.getElementById('darkModeToggle');
const body = document.body;
const icon = darkBtn.querySelector('i');

if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

darkBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    if (isLight) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// ========== VELOCITY IA ==========
const iaForm = document.getElementById('ia-form');
const iaInput = document.getElementById('ia-input');
const iaResponse = document.getElementById('ia-response');

iaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = iaInput.value.trim();
    if (!query) return;

    iaResponse.style.display = 'block';
    iaResponse.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Velocity IA pensando...';

    await new Promise(resolve => setTimeout(resolve, 1500));

    const q = query.toLowerCase();
    let respuesta = '';

    if (q.includes('procesador') || q.includes('cpu')) {
        respuesta = `🔥 <strong>Mejores CPUs:</strong><br>• Intel Core i9-13900K<br>• AMD Ryzen 9 7950X3D`;
    } else if (q.includes('laptop') || q.includes('portátil')) {
        respuesta = `💻 <strong>Laptops Gamer:</strong><br>• ASUS ROG Zephyrus G14<br>• Lenovo Legion Pro 5`;
    } else if (q.includes('teclado') || q.includes('ratón')) {
        respuesta = `⌨️ <strong>Periféricos:</strong><br>• HyperX Alloy Origins<br>• Logitech G Pro X Superlight`;
    } else if (q.includes('gear') || q.includes('velocity')) {
        respuesta = `🛡️ <strong>Velocity Gear:</strong><br>Próximamente: ropa y accesorios oficiales.`;
    } else {
        respuesta = `🤖 Prueba con: procesador, laptop, teclado, ratón o gear.`;
    }

    iaResponse.innerHTML = respuesta;
});