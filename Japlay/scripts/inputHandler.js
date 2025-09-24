const keys = {};
let diagonalFactor = 1 / Math.sqrt(2);


addEventListener('keydown', function(event) {
    keys[event.key] = true;
});

addEventListener('keyup', function(event) {
    keys[event.key] = false;
});

function updatePlayerVelocity() {
    const speed = tileSize / 10;
    let moveX = 0;
    let moveY = 0;

    // Calculate desired movement
    if (keys['w']) {
        moveY = -speed;
        player.direction = 'up';
    }
    if (keys['s']) {
        moveY = speed;
        player.direction = 'down';
    }
    if (keys['a']) {
        moveX = -speed;
        player.direction = 'left';
    }
    if (keys['d']) {
        moveX = speed;
        player.direction = 'right';
    }

    // Apply diagonal normalization
    if (moveX !== 0 && moveY !== 0) {
        moveX *= diagonalFactor;
        moveY *= diagonalFactor;
    }

    // Try X movement first
    if (moveX !== 0 && canMoveTo(player.x + moveX, player.y)) {
        player.x += moveX;
    }
    
    // Then try Y movement
    if (moveY !== 0 && canMoveTo(player.x, player.y + moveY)) {
        player.y += moveY;
    }
}
