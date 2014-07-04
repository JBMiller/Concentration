function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    for (var i = 0; i < CardsArray.length; ++i) {
        CardsArray[i].update();
        CardsArray[i].render();
    }
}