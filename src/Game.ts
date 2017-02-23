import 'pixi';
import 'p2';
import 'phaser';

import Board from './states/Board';
import Classroom from './states/Classroom';
import FunkyFacts from './states/FunkyFacts';

class GoSimon {
	game:Phaser.Game;
	board:Board;

	constructor() {
		this.game = new Phaser.Game( 800, 600, Phaser.AUTO, 'content', {
			preload: this.preload,
			create: this.create
		});        
	}

	preload() {
		this.game.load.spritesheet('item', 'assets/number-buttons.png', 160, 160);
		this.game.load.image('bg', 'assets/sky4.png');
		this.game.load.image('funky-facts-splash', 'assets/ubercorn-facts.jpg');
		this.game.load.image('paris-bg', 'assets/paris.jpg');
		this.game.load.image('russia-bg', 'assets/russia.jpg');
		this.game.load.image('london-bg', 'assets/london-bg.jpg');
		this.game.load.image('world-map-bg', 'assets/world-map-bg.png');
		this.game.load.audio('disco1', 'assets/funk.mp3');
		this.game.load.audio('disco2', 'assets/funk2.mp3');
	}

	create() {
		this.game.add.image(0, 0, 'bg');
		this.game.state.add('Classroom', Classroom);
		this.game.state.add('Board', Board);
		this.game.state.add('FunckFacts', FunkyFacts);
		this.game.state.start('Classroom', true, false);
	}
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new GoSimon();
}