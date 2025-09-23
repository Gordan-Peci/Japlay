window.TransitionToPage = function (page) {
    sessionStorage.setItem('transitioning', 'true');
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = page;
    }, 500);
};
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startButton').addEventListener('click', function () {
        TransitionToPage('game.html');
    });
});