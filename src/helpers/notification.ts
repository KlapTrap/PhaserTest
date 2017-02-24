let notification = null;
let initialPosition = -500
let shownPosition = 10;

function show (game:Phaser.Game, { time = -1, text }) {
    notification = game.add.text(initialPosition, 10, text, {});
    let tween = game.add.tween(notification);
    tween.to({x: 0}, 200, Phaser.Easing.Quadratic);
}

function hide() {

}

export default {
    show,
    hide
}