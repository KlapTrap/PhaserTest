// import { MAX_PLAYER_VER } from '../constants';
// import Player from './Player';
// export default class Game extends Phaser.Game {
//     platforms;
//     player;
//     stars;
//     score;
//     scoreText;
//     constructor() {
//         super(800, 600, Phaser.AUTO, 'content');
//     }

//     preload() {
//         this.load.image('sky', 'assets/sky.png');
//         this.load.image('ground', 'assets/platform.png');
//         this.load.image('star', 'assets/star.png');
//         this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
//         this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
// 	}

// 	create () {
// 		var logo = this.add.sprite( 0, 0, 'star');

//         //  We're going to be using physics, so enable the Arcade Physics system
//         this.physics.startSystem(Phaser.Physics.ARCADE);

//         //  A simple background for our
//         this.add.sprite(0, 0, 'sky');

//         //  The platforms group contains the ground and the 2 ledges we can jump on
//         this.platforms = this.add.group();

//         //  We will enable physics for any object that is created in this group
//         this.platforms.enableBody = true;

//         // Here we create the ground.
//         var ground = this.platforms.create(0, this.world.height - 64, 'ground');

//         //  Scale it to fit the width of the (the original sprite is 400x32 in size)
//         ground.scale.setTo(2, 2);

//         //  This stops it from falling away when you jump on it
//         ground.body.immovable = true;

//         //  Now let's create two ledges
//         var ledge = this.platforms.create(400, 400, 'ground');

//         ledge.body.immovable = true;

//         ledge = this.platforms.create(-150, 250, 'ground');

//         ledge.body.immovable = true;
//         this.player = new Player(this);
//         // The player and its settings
//         this.add.existing(this.player);

//         //  We need to enable physics on the player
//         this.physics.arcade.enable(this.player);

//         //  Player physics properties. Give the little guy a slight bounce.
//         this.player.body.bounce.y = 0.0;
//         this.player.body.gravity.y = 1000;
//         this.player.body.collideWorldBounds = true;

//         //  Our two animations, walking left and right.
//         this.player.animations.add('left', [0, 1, 2, 3], 10, true);
//         this.player.animations.add('right', [5, 6, 7, 8], 10, true);
//         this.stars = this.add.group();

//         this.stars.enableBody = true;

//         //  Here we'll create 12 of them evenly spaced apart
//         for (var i = 0; i < 12; i++)
//         {
//             //  Create a star inside of the 'stars' group
//             var star = this.stars.create(i * 70, 0, 'star');

//             //  Let gravity do its thing
//             star.body.gravity.y = 1000;

//             //  This just gives each star a slightly random bounce value
//             star.body.bounce.y = 0.7 + Math.random() * 0.2;
//         }
// 	}

//     collectStar (star:Phaser.Sprite) {
//         star.kill();
//         this.score += 10;
//         this.scoreText.text = 'Score: ' + this.score;
//     }

//     update() {
//         const hitPlatform = this.physics.arcade.collide(this.player, this.platforms);
//         const hitPlatformStar = this.physics.arcade.collide(this.stars, this.platforms);
//         this.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
//         const cursors = this.input.keyboard.createCursorKeys();
//         this.player.setAttemptedDirection(cursors);
        
//         if(this.player.body.touching.down) {
//             if (cursors.left.isDown) {
//                 //  Move to the left
//                 this.player.body.velocity.x = -MAX_PLAYER_VER;

//                 this.player.animations.play('left');
//             } else if (cursors.right.isDown) {
//                 //  Move to the right
//                 this.player.body.velocity.x = MAX_PLAYER_VER;

//                 this.player.animations.play('right');
//             } else {
//                 //  Stand still
//                 this.player.animations.stop();
//                 this.player.frame = 4;
//                 this.player.body.velocity.x = 0;
//             }
//             //  Allow the this.player to jump if they are touching the ground.
//             if (cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
//                 this.player.body.velocity.y = -650;
//             }
//         } else {
//             if (cursors.left.isDown) {
//                 //  Move to the left
//                 this.player.body.velocity.x -= 15;
//                 if(this.player.body.velocity.x < -MAX_PLAYER_VER) {
//                     this.player.body.velocity.x = -MAX_PLAYER_VER
//                 }

//                 this.player.animations.play('left');
//             } else if (cursors.right.isDown) {
//                 //  Move to the right
//                 this.player.body.velocity.x += 15;
//                 if(this.player.body.velocity.x > MAX_PLAYER_VER) {
//                     this.player.body.velocity.x = MAX_PLAYER_VER
//                 }
//                 this.player.animations.play('right');
//             }
//         }            
//     }
// }