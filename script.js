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

// ========== VELOCITY RUNNER ==========
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameRunning = true;
let score = 0;
let level = 1;
let speed = 4;

const player = {
    x: 100,
    y: 300,
    width: 30,
    height: 50,
    vy: 0,
    gravity: 0.6,
    jumpPower: -10,
    grounded: true
};

let chips = [];
let obstacles = [];
let frameCounter = 0;

// Salto
document.addEventListener('keydown', (e) => {
    if ((e.code === 'Space' || e.key === ' ') && player.grounded && gameRunning) {
        player.vy = player.jumpPower;
        player.grounded = false;
    }
});

canvas.addEventListener('click', () => {
    if (player.grounded && gameRunning) {
        player.vy = player.jumpPower;
        player.grounded = false;
    }
});

document.getElementById('reiniciarBtn').addEventListener('click', resetGame);

function resetGame() {
    gameRunning = true;
    score = 0;
    level = 1;
    speed = 4;
    chips = [];
    obstacles = [];
    player.y = 300;
    player.vy = 0;
    player.grounded = true;
    frameCounter = 0;
}

function drawPlayer() {
    ctx.fillStyle = '#b300b3';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Cabeza
    ctx.beginPath();
    ctx.arc(player.x + player.width/2, player.y - 8, 12, 0, Math.PI*2);
    ctx.fill();
    // Ojos
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(player.x + player.width/2 - 5, player.y - 12, 2, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(player.x + player.width/2 + 5, player.y - 12, 2, 0, Math.PI*2);
    ctx.fill();
    // Brazos cruzados
    ctx.strokeStyle = '#b300b3';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(player.x - 5, player.y + 15);
    ctx.lineTo(player.x + 15, player.y + 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(player.x + player.width + 5, player.y + 15);
    ctx.lineTo(player.x + player.width - 15, player.y + 10);
    ctx.stroke();
}

function drawChips() {
    chips.forEach(chip => {
        ctx.fillStyle = '#b300b3';
        ctx.fillRect(chip.x, chip.y, 15, 15);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(chip.x + 7.5, chip.y + 7.5, 4, 0, Math.PI*2);
        ctx.fill();
    });
}

function drawObstacles() {
    obstacles.forEach(obs => {
        ctx.strokeStyle = '#b300b3';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y);
        ctx.lineTo(obs.x + 20, obs.y - 15);
        ctx.lineTo(obs.x + 40, obs.y + 10);
        ctx.stroke();
    });
}

function update() {
    if (!gameRunning) return;

    player.vy += player.gravity;
    player.y += player.vy;
    
    if (player.y >= 320) {
        player.y = 320;
        player.vy = 0;
        player.grounded = true;
    }

    frameCounter++;
    if (frameCounter % 80 === 0) {
        chips.push({ x: canvas.width, y: 280 + Math.random() * 40 });
    }
    if (frameCounter % 100 === 0) {
        obstacles.push({ x: canvas.width, y: 320 });
    }

    chips = chips.filter(chip => {
        chip.x -= speed;
        if (chip.x < player.x + player.width &&
            chip.x + 15 > player.x &&
            chip.y < player.y + player.height &&
            chip.y + 15 > player.y) {
            score += 10;
            return false;
        }
        return chip.x > -20;
    });

    obstacles = obstacles.filter(obs => {
        obs.x -= speed;
        if (obs.x < player.x + player.width &&
            obs.x + 40 > player.x &&
            obs.y - 15 < player.y + player.height &&
            obs.y + 10 > player.y) {
            gameRunning = false;
        }
        return obs.x > -50;
    });

    if (score > level * 50) {
        level++;
        speed += 1;
    }
}

function drawBackground() {
    ctx.strokeStyle = '#1a001a';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i - 20, canvas.height);
        ctx.stroke();
    }
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 360, canvas.width, 40);
    ctx.strokeStyle = '#b300b3';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 360);
    ctx.lineTo(canvas.width, 360);
    ctx.stroke();
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#b300b3';
    ctx.font = '30px "Segoe UI"';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 20);
    ctx.fillStyle = '#fff';
    ctx.font = '16px "Segoe UI"';
    ctx.fillText(`Puntuación: ${score}  Nivel: ${level}`, canvas.width/2, canvas.height/2 + 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawChips();
    drawObstacles();
    drawPlayer();
    
    if (!gameRunning) {
        drawGameOver();
    }
    
    ctx.fillStyle = '#fff';
    ctx.font = '16px "Segoe UI"';
    ctx.textAlign = 'left';
    ctx.fillText(`Puntos: ${score}  Nivel: ${level}`, 10, 25);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();