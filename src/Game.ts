import 'pixi';
import 'p2';
import 'phaser';
import 'phaser-state-transition';

import Board from './states/Board';
import Start from './states/Start';
import Classroom from './states/Classroom';
import FunkyFacts from './states/FunkyFacts';
import GlitchRussia from './states/GlitchRussia';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';

class GoSimon {
	game:Phaser.Game;
	board:Board;

	constructor() {
		this.game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'content', {
			preload: this.preload,
			create: this.create
		});        
		// console.log(Phaser.Plugin.StateTransition.Out)
	}

	preload() {
		this.game.load.spritesheet('item', 'assets/number-buttons.png', 160, 160);
		this.game.load.image('bg', 'assets/sky4.png');
		this.game.load.image('start', 'assets/start.png');
		this.game.load.image('funky-facts-splash', 'assets/ubercorn-facts.png');
		this.game.load.image('ff-glitch-russia', 'assets/ff-glitch-russia.png');
		this.game.load.image('paris-bg', 'assets/paris.png');
		this.game.load.image('russia-bg', 'assets/russia.png');
		this.game.load.image('london-bg', 'assets/london-bg.png');
		this.game.load.image('world-map-bg', 'assets/world-map-bg.png');
		this.game.load.audio('disco1', 'assets/funk.mp3');
		this.game.load.audio('disco2', 'assets/funk2.mp3');
		this.game.load.audio('disco3', 'assets/funk3.mp3');
	}

	create() {
		// this.game.add.image(0, 0, 'bg').scale.setTo(.70, .70);
		this.game.state.add('Start', Start);
		this.game.state.add('Classroom', Classroom);
		this.game.state.add('Board', Board);
		this.game.state.add('FunckFacts', FunkyFacts);
		this.game.state.add('GlitchRussia', GlitchRussia);
		this.game.state.start('Start', true, false);
	}
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new GoSimon();
}