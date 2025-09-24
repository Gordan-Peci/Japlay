let gameState = 'classSelection';
let classChoice = null;
let playerColor = null;

document.getElementById('sword').addEventListener('click', function(){
    var choiceDiv = document.getElementById('classPicker');
    if (choiceDiv.style.display === "none"){
        choiceDiv.style.display = "block";
    } else {
        choiceDiv.style.display = "none";
        selectClass(1);
    }
});

document.getElementById('mace').addEventListener('click', function(){
    var choiceDiv = document.getElementById('classPicker');
    if (choiceDiv.style.display === "none"){
        choiceDiv.style.display = "block";
    } else {
        choiceDiv.style.display = "none";
        selectClass(2);
    }
});

document.getElementById('bow').addEventListener('click', function(){
    var choiceDiv = document.getElementById('classPicker');
    if (choiceDiv.style.display === "none"){
        choiceDiv.style.display = "block";
    } else {
        choiceDiv.style.display = "none";
        selectClass(3);
    }
});

function selectClass(choice) {
    classChoice = choice;
    gameState = 'playing';
    initializePlayer();
    startTimerFunc();
}

function initializePlayer() {
    // Set color based on class
    const colors = {
        1: '#f04c4cff',
        2: '#4649e4', 
        3: '#21cc29'
    };
    playerColor = colors[classChoice] || '#ffffff';
    
    // Create player object
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
    
    // Hide class picker UI
    document.getElementById('classPicker').style.display = "none";
}

function startTimerFunc(){
    let timeLeft = 60;
    document.getElementById('timerDisplay').innerText = `Time: ${timeLeft}s`;
    countdown = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
        }
    }, 1000)
}