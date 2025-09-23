// Input handler for player movement

addEventListener('keydown', function(event) {
    let speed = tileSize / 10; // Adjust speed as needed
    switch(event.key) {
        case 'w': 
        console.log('up');
           vy = -speed;
            break;
        case 's':
            vy = speed;
            break
        case 'a':
            vx = -speed;
            break;
        case 'd':
            vx = speed;
            break;
    }
});

addEventListener('keyup', function(event) {
    switch(event.key) {
        case 'w':
        case 's':
            vy = 0;
            break;
        case 'a':
        case 'd':
            vx = 0;
            break;
    }
});