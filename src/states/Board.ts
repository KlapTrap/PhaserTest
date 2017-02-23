import { SPRITE_BLOCK_COUNT, TILE_WIDTH, TILE_HEIGHT, TILE_PADDING } from '../constants';
import Tile from '../classes/Tile';
export default class Board extends Phaser.State {
    simon:Phaser.Group;
    N = 1;
    userCount = 0;
    currentCount = 0;
    sequenceCount = 4;
    sequenceList = [];
    simonSez = false;
    timeCheck;
    litSquare;
    winner;
    tryAgain;
    intro;
    tileCount;
    game:Phaser.Game;
    timeLastAction;
    hintingTile:Tile;
    music:Phaser.Sound;

    init({ tileCount = 8, sequenceCount = 4, sequenceList = [], bg }) {
        this.tileCount = tileCount;
        this.sequenceCount = sequenceCount;
        this.sequenceList = sequenceList;
        this.game.add.image(0, 0, bg || 'bg');
    }

    public static start (game, config = {}) {
        game.state.start('FunckFacts', true, false);
        setTimeout(function () {
            game.state.start('Board', true, false, config);
        }, 3000);   
    }

    create() {
        let that = this;
        this.music = this.game.add.audio('disco2');
        this.music.play();
        this.buildBoard();
        this.restart();
        this.setUp();
        setTimeout(
            function(){that.simonSequence(); that.intro = false;}, 1000);
    }

    stopHint() {
        if(this.hintingTile && this.hintingTile.blinkTween.isRunning) {
            this.hintingTile.blinkStop();
        }
    }
    /**
     * Makes one tile blink until the stopHint method is called
     */
    hintNextButton() {
        if(!this.hintingTile || !this.hintingTile.blinkTween.isRunning) {
            this.hintingTile = this.simon.getAt(this.sequenceList[this.userCount]);
            this.hintingTile.blinkStart();
        }
    }

    // introTween() {
    //     this.intro = true;
    //     for (var i = 0; i < this.tileCount; i++) {
    //         var flashing = this.game.add.tween(this.simon.getAt(i)).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 4, true);
    //         var final = this.game.add.tween(this.simon.getAt(i)).to( { alpha: .25 }, 500, Phaser.Easing.Linear.None, true);
    //         flashing.chain(final);
    //         flashing.start();
    //     }
    // }

    getRandomBlock() {
        return Math.floor(Math.random() * SPRITE_BLOCK_COUNT);
    }

    getGridSetting() {
        const rowItemCount = this.tileCount / 2;
        const gameWidth = this.game.width;
        const boardWidth = (rowItemCount * TILE_WIDTH) + (rowItemCount * TILE_PADDING);
        const boardPadding = (gameWidth - boardWidth) / 2;
        return {
            boardPadding
        }
    }

    buildBoard () {
        this.simon = this.game.add.group();
        var item:Phaser.Sprite;
        const rowLength = this.tileCount / 2;
        const gridSettings = this.getGridSetting();

        this.buildRow({ rowLength, gridSettings, rowNumber: 1 });
        this.buildRow({ rowLength, gridSettings, rowNumber: 2 });
    }

    buildRow({rowLength, gridSettings, rowNumber}) {
        var item:Phaser.Sprite;
        let y = 150 * rowNumber;
        if (rowNumber > 1) {
            y += TILE_PADDING
        }
        for (var i = 0; i < rowLength; i++) {
            item = new Tile(this.game, gridSettings.boardPadding + (TILE_WIDTH + TILE_PADDING) * i, y, 'item', this.getRandomBlock());
            // Enable input.
            item.inputEnabled = true;
            item.input.start(0, true);
            item.events.onInputDown.add(this.select, this);
            item.events.onInputUp.add(this.release, this);
            item.events.onInputOut.add(this.moveOff, this);
            item.fade();
            this.simon.add(item);
        }
    }

    update() {
        let that = this;
        if (this.simonSez) {
            if (this.game.time.now - this.timeCheck > 700) {
                const litSquare = this.simon.getAt(this.litSquare);
                if (litSquare.alpha === 1) {
                    litSquare.fade();
                    this.timeCheck = this.game.time.now;
                } else {
                    if (that.currentCount < that.N) {
                        // that.game.paused = false;
                        that.simonSequence();
                    } else {
                        that.simonSez = false;
                        // that.game.paused = false;
                    }
                }
            }
        } else {
            if (this.game.time.now - this.timeLastAction > 10000) {
                this.timeLastAction = this.game.time.now;
                this.hintNextButton();
            }
        }
    }

    playerSequence(selected) {
        let that = this;
        const correctSquare = this.sequenceList[this.userCount];
        this.userCount++;
        const thisSquare = this.simon.getIndex(selected);
        this.timeLastAction = this.game.time.now;

        if (thisSquare == correctSquare) {
            if (this.userCount == this.N) {
                if (this.N == this.sequenceCount) {
                    this.winner = true;
                    setTimeout(function(){that.game.state.start('Classroom', true, false);}, 3000);
                } else {
                    this.userCount = 0;
                    this.currentCount = 0;
                    this.N++;
                    this.simonSez = true;
                }
            }
        } else {
            this.tryAgain = true;
            this.userCount = 0;
            this.currentCount = 0;
            setTimeout(function(){that.simonSequence();}, 3000);
        }

    }

    simonSequence () {
        this.simonSez = true;
        this.litSquare = this.sequenceList[this.currentCount];
        this.simon.getAt(this.litSquare).shine();
        this.timeCheck = this.game.time.now;
        if (!this.tryAgain) {
            this.currentCount++;
        }
        this.tryAgain = false;
    }

    setUp() {
        if (!this.sequenceList.length) {
            for (var i = 0; i < this.sequenceCount; i++) {
                const thisSquare = this.game.rnd.integerInRange(0,this.tileCount - 1);
                this.sequenceList.push(thisSquare);
            }
        }
        this.timeLastAction = this.game.time.now;
    }

    select(item, pointer) {
        this.stopHint();
        if (!this.simonSez && !this.intro && !this.tryAgain && !this.winner) {
            item.shine();
        }
    }

    release(item, pointer) {
        if (!this.simonSez && !this.intro && !this.tryAgain && !this.winner) {
            item.fade();
            this.playerSequence(item);
        }
    }

    moveOff(item, pointer) {
        if (!this.simonSez && !this.intro && !this.tryAgain && !this.winner) {
            item.fade();
        }
    }

    restart() {
        let that = this;
        this.simonSez = false;
        this.N = 1;
        this.userCount = 0;
        this.currentCount = 0;
        this.sequenceList = [];
        this.winner = false;
        this.tryAgain = false;
    }

    render() {
        if (!this.intro) {
            if (this.simonSez) {
                this.game.debug.text('Glitch!', 360, 96, 'rgb(255,0,0)');
            } else {
                this.game.debug.text('Fix!', 360, 96, 'rgb(0,255,0)');
            }
        } else {
            this.game.debug.text('Get Ready', 360, 96, 'rgb(0,0,255)');
        }

        if (this.winner) {
            this.game.debug.text('You Win!', 360, 32, 'rgb(0,0,255)');
        } else if (this.tryAgain) {
            this.game.debug.text('Try again!', 360, 32, 'rgb(0,0,255)');
        }
    }

    shutdown() {
        this.music.destroy();
    }
}