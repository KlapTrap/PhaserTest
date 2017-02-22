import Board from './Board';
import Classroom from './Classroom';
class GoSimon
{
	game:Phaser.Game;
    board:Board;
	
	constructor() {
		this.game = new Phaser.Game( 800, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });        
	}
	
	preload() {
        this.game.load.spritesheet('item', 'assets/number-buttons.png', 160, 160);
        this.game.load.image('bg', 'assets/sky4.png');
	}

	create() {
        this.game.add.image(0, 0, 'bg');
        this.game.state.add('Classroom', Classroom);
        this.game.state.add('Board', Board);
        this.game.state.start('Classroom', true, false);
	}

    update() {
    }    

    render() {
    } 
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new GoSimon();
}