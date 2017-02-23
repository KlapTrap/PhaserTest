import Board from './Board';
export default class ClassRoom extends Phaser.State {
    menu:Phaser.Group;
    game:Phaser.Game;
    create() {
        this.game.add.image(0, 0, 'funky-facts-splash');
    }
}