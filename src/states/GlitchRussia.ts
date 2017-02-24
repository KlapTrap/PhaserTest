export default class GlitchRussia extends Phaser.State {
    game:Phaser.Game;
    create() {
        let image = this.game.add.image(0, 0, 'ff-glitch-russia');
        image.scale.setTo(.68, .68);
    }
}