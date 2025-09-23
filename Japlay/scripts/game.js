const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const levels = ['Japlay N5', 'Japlay N4', 'Japlay N3', 'Japlay N2', 'Japlay N1'];
document.getElementById('gameTitle').innerText = levels[0];

let score = 0;
document.getElementById('score').innerText = `Score: ${score}`;

const levelN5 = [];
for(let i =0; i < 22 * 40; i++){
    levelN5.push(Math.floor(Math.random() * 4));
}

const tileSize = 32; // Size of each tile in pixels
const rows = 22; // Number of rows in the grid
const cols = 40; // Number of columns in the grid

canvas.width = tileSize * cols;
canvas.height = tileSize * rows;

const tileImage = new Image();
tileImage.src = "assets/tileSetN5.png"; // Path to the tile image
const imageCols = tileImage.width / tileSize; // Number of columns in the tile image
const imageRows = tileImage.height / tileSize; // Number of rows in the tile image

function getTile(map,col,row){
    return map[row * cols + col];
}

function drawLevel(level){
    for(let row = 0; row < rows; row++){
        for(let col = 0; col < cols; col++){
            const tile = getTile(level, col, row);
            ctx.drawImage(tileImage, (tile % imageCols) * tileSize, Math.floor(tile / imageCols) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
        }   
    }  
}

function startGame() {
    canvas.width = cols * tileSize;
    canvas.height = rows * tileSize;
    drawLevel(levelN5);
}