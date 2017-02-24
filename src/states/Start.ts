export default class ClassRoom extends Phaser.State {;
    game:Phaser.Game;
    create() {
        this.game.add.image(0, 0, 'start').scale.setTo(.68, .68);
        let music = this.game.add.audio('disco3', .5, true);
        music.play();
    }
    update() {
        if(this.game.input.activePointer.isDown) {
            this.game.state.start('Classroom', Phaser.Plugin.StateTransition.Out.SlideLeft);
        }
    }
}