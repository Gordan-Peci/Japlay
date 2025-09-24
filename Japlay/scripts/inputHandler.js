const keys = {};
let diagonalFactor = 1 / Math.sqrt(2);


addEventListener('keydown', function(event) {
    keys[event.key] = true;
    updatePlayerVelocity();
});

addEventListener('keyup', function(event) {
    keys[event.key] = false;
    updatePlayerVelocity();
});

function updatePlayerVelocity() {
    let speed = tileSize/10;
    player.vx = 0;
    player.vy = 0;

    if(keys['w']) player.vy = -speed;
    if(keys['s']) player.vy = speed;
    if(keys['a']) player.vx = -speed;
    if(keys['d']) player.vx = speed;

    if (player.vx !== 0 && player.vy !== 0) {
        player.vx *= diagonalFactor;
        player.vy *= diagonalFactor;
    }
}
