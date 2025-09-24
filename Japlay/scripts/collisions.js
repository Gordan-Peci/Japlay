function getTileAt(x, y) {
    const tileX = Math.floor(x / tileSize);
    const tileY = Math.floor(y / tileSize);
    return (tileX < 0 || tileY < 0 || tileY >= yTiles || tileX >= xTiles) ? 1 : lvlN5Tiles[tileY][tileX];
}

function canMoveTo(newX, newY) {
    const checkPoints = [
        [newX, newY], // center
        [newX - player.radius, newY], // left
        [newX + player.radius, newY], // right
        [newX, newY - player.radius], // top
        [newX, newY + player.radius], // bottom
        [newX - player.radius * 0.7, newY - player.radius * 0.7], // top-left
        [newX + player.radius * 0.7, newY - player.radius * 0.7], // top-right
        [newX - player.radius * 0.7, newY + player.radius * 0.7], // bottom-left
        [newX + player.radius * 0.7, newY + player.radius * 0.7]  // bottom-right
    ];
    
    return !checkPoints.some(([x, y]) => getTileAt(x, y) === 1);
}