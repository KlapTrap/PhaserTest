import Board from './Board';
import { GAME_HEIGHT, GAME_WIDTH } from '../constants';
export default class ClassRoom extends Phaser.State {
    menu:Phaser.Group;
    game:Phaser.Game;
    create() {
        let image = this.game.add.image(0, 0, 'funky-facts-splash');
        image.scale.setTo(.68, .68);
    }
}