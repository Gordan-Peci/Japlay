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


let x = canvas.width / 2;
let y = canvas.height / 2;
let vx = 0;
let vy = 0;
let radius = tileSize / 2;
let color = '#f04c4cff';


// Function to update and draw the player
function drawPlayer() {
    x += vx;
    y += vy;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

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
function lvlTypesN5() {
    let type = Math.floor(Math.random() * 3) + 1; // Randomly select type 1, 2, or 3
    const centerX = Math.floor(xTiles / 2); // 20
    const centerY = Math.floor(yTiles / 2); // 10
    const gap = 3;

    if (type === 1) {
        lvlN5Tiles[centerY-gap-1][centerX-1] = 1;
        lvlN5Tiles[centerY-gap-1][centerX] = 1;
        lvlN5Tiles[centerY-gap-1][centerX+1] = 1;

        lvlN5Tiles[centerY+gap+1][centerX-1] = 1;
        lvlN5Tiles[centerY+gap+1][centerX] = 1;
        lvlN5Tiles[centerY+gap+1][centerX+1] = 1;

        lvlN5Tiles[centerY-1][centerX-gap-1] = 1;
        lvlN5Tiles[centerY][centerX-gap-1] = 1;
        lvlN5Tiles[centerY+1][centerX-gap-1] = 1;

        lvlN5Tiles[centerY-1][centerX+gap+1] = 1;
        lvlN5Tiles[centerY][centerX+gap+1] = 1;
        lvlN5Tiles[centerY+1][centerX+gap+1] = 1;

    }
    else if (type === 2) {
        lvlN5Tiles[centerY-gap-1][centerX-gap-1] = 1;
        lvlN5Tiles[centerY-gap-1][centerX-gap-2] = 1;
        lvlN5Tiles[centerY-gap-1][centerX-gap-3] = 1;

        lvlN5Tiles[centerY+gap+1][centerX-gap-1] = 1;
        lvlN5Tiles[centerY+gap+1][centerX-gap-2] = 1;
        lvlN5Tiles[centerY+gap+1][centerX-gap-3] = 1;

        lvlN5Tiles[centerY-gap-1][centerX+gap+1] = 1;
        lvlN5Tiles[centerY-gap-1][centerX+gap+2] = 1;
        lvlN5Tiles[centerY-gap-1][centerX+gap+3] = 1;
 
        lvlN5Tiles[centerY+gap+1][centerX+gap+1] = 1;
        lvlN5Tiles[centerY+gap+1][centerX+gap+2] = 1;
        lvlN5Tiles[centerY+gap+1][centerX+gap+3] = 1;
    
    }
    else{
        lvlN5Tiles[centerY-gap-1][centerX] = 1;
        lvlN5Tiles[centerY-gap-2][centerX] = 1;
        lvlN5Tiles[centerY-gap-3][centerX] = 1;

        lvlN5Tiles[centerY+gap+1][centerX] = 1;
        lvlN5Tiles[centerY+gap+2][centerX] = 1;
        lvlN5Tiles[centerY+gap+3][centerX] = 1;

        lvlN5Tiles[centerY][centerX-gap-1] = 1;
        lvlN5Tiles[centerY][centerX-gap-2] = 1;
        lvlN5Tiles[centerY][centerX-gap-3] = 1;
 
        lvlN5Tiles[centerY][centerX+gap+1] = 1;
        lvlN5Tiles[centerY][centerX+gap+2] = 1;
        lvlN5Tiles[centerY][centerX+gap+3] = 1;

    }
    return type;
}
lvlTypesN5();

// Separate function to draw the level
function drawLevelN5() {
    ctx.fillStyle = colorN5;

    for (let y = 0; y < yTiles; y++) {
        for (let x = 0; x < xTiles; x++) {
            if (lvlN5Tiles[y][x] === 1) {
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }
}

function drawLevel() {
    drawWalls(colorN5);
    drawLevelN5(colorN5);
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLevel();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

// Start the game
window.startGame = function() {
    gameLoop();
} 