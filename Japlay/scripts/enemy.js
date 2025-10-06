function isValidEnemyPosition(x, y, radius) {
    // Check if position is within canvas bounds
    if (x - radius < 0 || x + radius > canvas.width || 
        y - radius < 0 || y + radius > canvas.height) {
        return false;
    }
    
    // Check if position overlaps with walls
    const checkPoints = [
        [x, y], // center
        [x - radius, y], // left
        [x + radius, y], // right
        [x, y - radius], // top
        [x, y + radius], // bottom
        [x - radius * 0.7, y - radius * 0.7], // top-left
        [x + radius * 0.7, y - radius * 0.7], // top-right
        [x - radius * 0.7, y + radius * 0.7], // bottom-left
        [x + radius * 0.7, y + radius * 0.7]  // bottom-right
    ];
    
    // If any check point is on a wall, position is invalid
    if (checkPoints.some(([checkX, checkY]) => getTileAt(checkX, checkY) === 1)) {
        return false;
    }
    
    // Check if position overlaps with existing enemies
    for (let enemy of enemies) {
        const dx = x - enemy.x;
        const dy = y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < radius + enemy.radius) {
            return false;
        }
    }
    
    // Check if position overlaps with player
    if (player) {
        const dx = x - player.x;
        const dy = y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < radius + player.radius) {
            return false;
        }
    }
    
    return true;
}

// Function to create a new enemy
function createEnemy() {
    if (enemies.length >= maxEnemies) return;
    
    const radius = tileSize / 2.5; // Slightly smaller than player
    const color = '#000000'; // Black color
    
    let attempts = 0;
    const maxAttempts = 50; // Prevent infinite loop
    
    while (attempts < maxAttempts) {
        // Try random position
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        
        if (isValidEnemyPosition(x, y, radius)) {
            enemies.push(new EnemyObj(x, y, radius, color));
            break;
        }
        
        attempts++;
    }
}

// Function to draw all enemies
function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        ctx.fillStyle = enemy.color;
        ctx.fill();
        ctx.closePath();
    });
}

// Function to check collision between player and enemies
function checkEnemyCollisions() {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < player.radius + enemy.radius) {
            // Collision detected - handle accordingly
            handleEnemyCollision(i);
            break; // Only handle one collision per frame
        }
    }
}

function handleEnemyCollision(enemyIndex) {   
    //Remove the enemy
    enemies.splice(enemyIndex, 1);
    
    // If all enemies are collected, spawn new ones
    if (enemies.length === 0) {
        initializeEnemies(); // This will create 5 new enemies
    }

    // Show a question
    showQuestion();
    
}    

function showQuestion() {
    // Pause the game
    gameState = 'question';
    
    // Show the question display
    document.getElementById('questionDisplay').style.display = "block";
    
    // Get and display a new question
    nextQuestion();
}

function flashScreen(color, duration) {
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;
    
    setTimeout(() => {
        // The flash will disappear on next draw cycle
    }, duration);
}

// Function to initialize enemies at game start
function initializeEnemies() {
    enemies = []; // Clear existing enemies
    
    // Create initial enemies
    for (let i = 0; i < maxEnemies; i++) {
        createEnemy();
    }
}