const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const levels = ['Japlay N5', 'Japlay N4', 'Japlay N3', 'Japlay N2', 'Japlay N1'];
document.getElementById('gameTitle').innerText = levels[0];

let score = 0;
document.getElementById('score').innerText = `Score: ${score}`;

const tileSize = 32;
const xTiles = 41;
const yTiles = 21;
canvas.width = tileSize * xTiles;
canvas.height = tileSize * yTiles;

//color for N5 level
const colorN5 = "#808081";

// Initialize tile arrays for each level
const lvlN5Tiles = Array.from({ length: yTiles }, () => Array(xTiles).fill(0));
const lvlN4Tiles = Array.from({ length: yTiles }, () => Array(xTiles).fill(0));
const lvlN3Tiles = Array.from({ length: yTiles }, () => Array(xTiles).fill(0));
const lvlN2Tiles = Array.from({ length: yTiles }, () => Array(xTiles).fill(0));
const lvlN1Tiles = Array.from({ length: yTiles }, () => Array(xTiles).fill(0));

// Function to draw walls around the edges of the canvas
function drawWalls(color) {
    for (let y=0; y<yTiles; y++) {
        lvlN5Tiles[y][0] = 1;
        ctx.fillStyle = color;
        ctx.fillRect(0, y*tileSize, tileSize, tileSize);
        lvlN5Tiles[y][xTiles-1] = 1;
        ctx.fillStyle = color;
        ctx.fillRect((xTiles-1)*tileSize, y*tileSize, tileSize, tileSize);
    }
    for (let x=0; x<xTiles; x++) {
        lvlN5Tiles[0][x] = 1;
        ctx.fillStyle = color;
        ctx.fillRect(x*tileSize, 0, tileSize, tileSize);
        lvlN5Tiles[yTiles-1][x] = 1;
        ctx.fillStyle = color;
        ctx.fillRect(x*tileSize, (yTiles-1)*tileSize, tileSize, tileSize);
    }
}

// Function to create different level types for N5
function lvlTypesN5(color) {
    let type = Math.floor(Math.random() * 3) + 1; // Randomly select type 1, 2, or 3
    const centerX = Math.floor(xTiles / 2); // 20
    const centerY = Math.floor(yTiles / 2); // 10
    const gap = 3;

    if (type === 1) {
        // Top side of square (3 tiles wide)
        lvlN5Tiles[centerY-gap-1][centerX-1] = 1;
        lvlN5Tiles[centerY-gap-1][centerX] = 1;
        lvlN5Tiles[centerY-gap-1][centerX+1] = 1;
        ctx.fillRect((centerX-1)*tileSize, (centerY-gap-1)*tileSize, tileSize, tileSize);
        ctx.fillRect(centerX*tileSize, (centerY-gap-1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX+1)*tileSize, (centerY-gap-1)*tileSize, tileSize, tileSize);

        // Bottom side of square (3 tiles wide)
        lvlN5Tiles[centerY+gap+1][centerX-1] = 1;
        lvlN5Tiles[centerY+gap+1][centerX] = 1;
        lvlN5Tiles[centerY+gap+1][centerX+1] = 1;
        ctx.fillRect((centerX-1)*tileSize, (centerY+gap+1)*tileSize, tileSize, tileSize);
        ctx.fillRect(centerX*tileSize, (centerY+gap+1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX+1)*tileSize, (centerY+gap+1)*tileSize, tileSize, tileSize);

        // Left side of square (3 tiles tall)
        lvlN5Tiles[centerY-1][centerX-gap-1] = 1;
        lvlN5Tiles[centerY][centerX-gap-1] = 1;
        lvlN5Tiles[centerY+1][centerX-gap-1] = 1;
        ctx.fillRect((centerX-gap-1)*tileSize, (centerY-1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX-gap-1)*tileSize, centerY*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX-gap-1)*tileSize, (centerY+1)*tileSize, tileSize, tileSize);

        // Right side of square (3 tiles tall)
        lvlN5Tiles[centerY-1][centerX+gap+1] = 1;
        lvlN5Tiles[centerY][centerX+gap+1] = 1;
        lvlN5Tiles[centerY+1][centerX+gap+1] = 1;
        ctx.fillRect((centerX+gap+1)*tileSize, (centerY-1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX+gap+1)*tileSize, centerY*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX+gap+1)*tileSize, (centerY+1)*tileSize, tileSize, tileSize);

    }
    else if (type === 2) {
        lvlN5Tiles[centerY-gap-1][centerX-gap-1] = 1;
        lvlN5Tiles[centerY-gap-1][centerX-gap-2] = 1;
        lvlN5Tiles[centerY-gap-1][centerX-gap-3] = 1;
        ctx.fillRect((centerX-gap-1)*tileSize, (centerY-gap-1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX-gap-2)*tileSize, (centerY-gap-1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX-gap-3)*tileSize, (centerY-gap-1)*tileSize, tileSize, tileSize);
        lvlN5Tiles[centerY+gap+1][centerX-gap-1] = 1;
        lvlN5Tiles[centerY+gap+1][centerX-gap-2] = 1;
        lvlN5Tiles[centerY+gap+1][centerX-gap-3] = 1;
        ctx.fillRect((centerX-gap-1)*tileSize, (centerY+gap+1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX-gap-2)*tileSize, (centerY+gap+1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX-gap-3)*tileSize, (centerY+gap+1)*tileSize, tileSize, tileSize);
        lvlN5Tiles[centerY-gap-1][centerX+gap+1] = 1;
        lvlN5Tiles[centerY-gap-1][centerX+gap+2] = 1;
        lvlN5Tiles[centerY-gap-1][centerX+gap+3] = 1;
        ctx.fillRect((centerX+gap+1)*tileSize, (centerY-gap-1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX+gap+2)*tileSize, (centerY-gap-1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX+gap+3)*tileSize, (centerY-gap-1)*tileSize, tileSize, tileSize);
        lvlN5Tiles[centerY+gap+1][centerX+gap+1] = 1;
        lvlN5Tiles[centerY+gap+1][centerX+gap+2] = 1;
        lvlN5Tiles[centerY+gap+1][centerX+gap+3] = 1;
        ctx.fillRect((centerX+gap+1)*tileSize, (centerY+gap+1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX+gap+2)*tileSize, (centerY+gap+1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX+gap+3)*tileSize, (centerY+gap+1)*tileSize, tileSize, tileSize);
    }
    else{
        lvlN5Tiles[centerY-gap-1][centerX] = 1;
        lvlN5Tiles[centerY-gap-2][centerX] = 1;
        lvlN5Tiles[centerY-gap-3][centerX] = 1;
        ctx.fillRect((centerX)*tileSize, (centerY-gap-1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX)*tileSize, (centerY-gap-2)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX)*tileSize, (centerY-gap-3)*tileSize, tileSize, tileSize);
        lvlN5Tiles[centerY+gap+1][centerX] = 1;
        lvlN5Tiles[centerY+gap+2][centerX] = 1;
        lvlN5Tiles[centerY+gap+3][centerX] = 1;
        ctx.fillRect((centerX)*tileSize, (centerY+gap+1)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX)*tileSize, (centerY+gap+2)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX)*tileSize, (centerY+gap+3)*tileSize, tileSize, tileSize);
        lvlN5Tiles[centerY][centerX-gap-1] = 1;
        lvlN5Tiles[centerY][centerX-gap-2] = 1;
        lvlN5Tiles[centerY][centerX-gap-3] = 1;
        ctx.fillRect((centerX-gap-1)*tileSize, (centerY)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX-gap-2)*tileSize, (centerY)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX-gap-3)*tileSize, (centerY)*tileSize, tileSize, tileSize);
        lvlN5Tiles[centerY][centerX+gap+1] = 1;
        lvlN5Tiles[centerY][centerX+gap+2] = 1;
        lvlN5Tiles[centerY][centerX+gap+3] = 1;
        ctx.fillRect((centerX+gap+1)*tileSize, (centerY)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX+gap+2)*tileSize, (centerY)*tileSize, tileSize, tileSize);
        ctx.fillRect((centerX+gap+3)*tileSize, (centerY)*tileSize, tileSize, tileSize);
    }
}

window.startGame = function() {
    drawWalls(colorN5);
    lvlTypesN5(colorN5);
}