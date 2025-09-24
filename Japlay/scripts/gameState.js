let gameState = 'classSelection';
let classChoice = null;
let playerColor = null;
let countdown = null;
let timeLeft = 0;
let animationId = null;

document.getElementById('sword').addEventListener('click', function(){
    var choiceDiv = document.getElementById('classPicker');
    choiceDiv.style.display = "none";
    selectClass(1);
});

document.getElementById('mace').addEventListener('click', function(){
    var choiceDiv = document.getElementById('classPicker');
    choiceDiv.style.display = "none";
    selectClass(2);
});

document.getElementById('bow').addEventListener('click', function(){
    var choiceDiv = document.getElementById('classPicker');
    choiceDiv.style.display = "none";
    selectClass(3);
});

function initializePlayer() {
    const colors = {
        1: '#f04c4cff',
        2: '#4649e4', 
        3: '#21cc29'
    };
    playerColor = colors[classChoice] || '#ffffff';
    
    player = new PlayerObj(
        canvas.width / 2,
        canvas.height / 2,
        0,
        0,
        tileSize / 2,
        playerColor,
        0,
        classChoice
    );
}

function startTimerFunc(){
    timeLeft = 60;
    document.getElementById('timerDisplay').innerText = `Time: ${timeLeft}s`;
    
    if (countdown) {
        clearInterval(countdown);
    }
    
    countdown = setInterval(function() {
        timeLeft--;
        document.getElementById('timerDisplay').textContent = `Time: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    gameState = 'outOfTime';
    clearInterval(countdown);
    
    // Stop player movement
    if (player) {
        player.vx = 0;
        player.vy = 0;
    }
    
    // Show out of time message
    document.getElementById('outOfTime').style.display = "block";
    document.getElementById('endOfTimeScoreDisplay').innerText = `Score: ${score}`;
}