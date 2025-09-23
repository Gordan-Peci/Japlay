document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('transitioning') === 'true') {
        sessionStorage.removeItem('transitioning');
        document.body.style.opacity = 0;
        
        requestAnimationFrame(() => {
            document.body.style.opacity = 1;
        });
    }
});