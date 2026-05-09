document.addEventListener('DOMContentLoaded', () => {
    const genBtn = document.getElementById('gen-btn');
    const iaInput = document.getElementById('ia-input');
    const heroTitle = document.querySelector('.glitch-text');

    // 1. Efecto de escritura para el placeholder
    const frases = [
        "¿Qué CPU es mejor para streaming?",
        "Busca una laptop para diseño 4K...",
        "Configuración de periféricos Velocity...",
        "Pregunta a Velocity IA..."
    ];
    
    let fraseIndex = 0;
    setInterval(() => {
        iaInput.placeholder = frases[fraseIndex];
        fraseIndex = (fraseIndex + 1) % frases.length;
    }, 3000);

    // 2. Lógica del botón Generar con efecto visual
    genBtn.addEventListener('click', () => {
        const query = iaInput.value.trim();

        if (query === "") {
            // Animación de error si está vacío
            iaInput.style.border = "2px solid red";
            setTimeout(() => iaInput.style.border = "2px solid var(--neon-purple)", 1000);
            return;
        }

        // Cambiamos el texto del botón para simular procesamiento
        genBtn.innerText = "Procesando...";
        genBtn.style.background = "#555";
        
        // Simulamos la respuesta de la IA de Velocity
        setTimeout(() => {
            alert("🚀 Velocity IA ha analizado tu consulta: '" + query + "'\n\nResultado: Hemos optimizado la base de datos de hardware para tu perfil Gamer. ¡Revisa tu correo para la configuración personalizada!");
            
            genBtn.innerText = "Generar";
            genBtn.style.background = "var(--neon-cyan)";
            iaInput.value = ""; // Limpiamos el buscador
        }, 2000);
    });

    // 3. Efecto de "Glitch" extra al pasar el mouse por el título
    heroTitle.addEventListener('mouseover', () => {
        heroTitle.style.textShadow = "5px 5px var(--neon-purple), -5px -5px var(--neon-cyan)";
    });

    heroTitle.addEventListener('mouseleave', () => {
        heroTitle.style.textShadow = "0 0 20px var(--neon-cyan)";
    });
});