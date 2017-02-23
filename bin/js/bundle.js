/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants_1 = __webpack_require__(4);
var Tile_1 = __webpack_require__(3);
var Board = (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.N = 1;
        _this.userCount = 0;
        _this.currentCount = 0;
        _this.sequenceCount = 4;
        _this.sequenceList = [];
        _this.simonSez = false;
        return _this;
    }
    Board.prototype.init = function (_a) {
        var _b = _a.tileCount, tileCount = _b === void 0 ? 8 : _b, _c = _a.sequenceCount, sequenceCount = _c === void 0 ? 4 : _c, _d = _a.sequenceList, sequenceList = _d === void 0 ? [] : _d, bg = _a.bg;
        this.tileCount = tileCount;
        this.sequenceCount = sequenceCount;
        this.sequenceList = sequenceList;
        this.game.add.image(0, 0, bg || 'bg');
    };
    Board.start = function (game, config) {
        if (config === void 0) { config = {}; }
        game.state.start('FunckFacts', true, false);
        setTimeout(function () {
            game.state.start('Board', true, false, config);
        }, 3000);
    };
    Board.prototype.create = function () {
        var that = this;
        this.music = this.game.add.audio('disco2');
        this.music.play();
        this.buildBoard();
        this.restart();
        this.setUp();
        setTimeout(function () { that.simonSequence(); that.intro = false; }, 1000);
    };
    Board.prototype.stopHint = function () {
        if (this.hintingTile && this.hintingTile.blinkTween.isRunning) {
            this.hintingTile.blinkStop();
        }
    };
    /**
     * Makes one tile blink until the stopHint method is called
     */
    Board.prototype.hintNextButton = function () {
        if (!this.hintingTile || !this.hintingTile.blinkTween.isRunning) {
            this.hintingTile = this.simon.getAt(this.sequenceList[this.userCount]);
            this.hintingTile.blinkStart();
        }
    };
    // introTween() {
    //     this.intro = true;
    //     for (var i = 0; i < this.tileCount; i++) {
    //         var flashing = this.game.add.tween(this.simon.getAt(i)).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 4, true);
    //         var final = this.game.add.tween(this.simon.getAt(i)).to( { alpha: .25 }, 500, Phaser.Easing.Linear.None, true);
    //         flashing.chain(final);
    //         flashing.start();
    //     }
    // }
    Board.prototype.getRandomBlock = function () {
        return Math.floor(Math.random() * constants_1.SPRITE_BLOCK_COUNT);
    };
    Board.prototype.getGridSetting = function () {
        var rowItemCount = this.tileCount / 2;
        var gameWidth = this.game.width;
        var boardWidth = (rowItemCount * constants_1.TILE_WIDTH) + (rowItemCount * constants_1.TILE_PADDING);
        var boardPadding = (gameWidth - boardWidth) / 2;
        return {
            boardPadding: boardPadding
        };
    };
    Board.prototype.buildBoard = function () {
        this.simon = this.game.add.group();
        var item;
        var rowLength = this.tileCount / 2;
        var gridSettings = this.getGridSetting();
        this.buildRow({ rowLength: rowLength, gridSettings: gridSettings, rowNumber: 1 });
        this.buildRow({ rowLength: rowLength, gridSettings: gridSettings, rowNumber: 2 });
    };
    Board.prototype.buildRow = function (_a) {
        var rowLength = _a.rowLength, gridSettings = _a.gridSettings, rowNumber = _a.rowNumber;
        var item;
        var y = 150 * rowNumber;
        if (rowNumber > 1) {
            y += constants_1.TILE_PADDING;
        }
        for (var i = 0; i < rowLength; i++) {
            item = new Tile_1.default(this.game, gridSettings.boardPadding + (constants_1.TILE_WIDTH + constants_1.TILE_PADDING) * i, y, 'item', this.getRandomBlock());
            // Enable input.
            item.inputEnabled = true;
            item.input.start(0, true);
            item.events.onInputDown.add(this.select, this);
            item.events.onInputUp.add(this.release, this);
            item.events.onInputOut.add(this.moveOff, this);
            item.fade();
            this.simon.add(item);
        }
    };
    Board.prototype.update = function () {
        var that = this;
        if (this.simonSez) {
            if (this.game.time.now - this.timeCheck > 700) {
                var litSquare = this.simon.getAt(this.litSquare);
                if (litSquare.alpha === 1) {
                    litSquare.fade();
                    this.timeCheck = this.game.time.now;
                }
                else {
                    if (that.currentCount < that.N) {
                        // that.game.paused = false;
                        that.simonSequence();
                    }
                    else {
                        that.simonSez = false;
                    }
                }
            }
        }
        else {
            if (this.game.time.now - this.timeLastAction > 10000) {
                this.timeLastAction = this.game.time.now;
                this.hintNextButton();
            }
        }
    };
    Board.prototype.playerSequence = function (selected) {
        var that = this;
        var correctSquare = this.sequenceList[this.userCount];
        this.userCount++;
        var thisSquare = this.simon.getIndex(selected);
        this.timeLastAction = this.game.time.now;
        if (thisSquare == correctSquare) {
            if (this.userCount == this.N) {
                if (this.N == this.sequenceCount) {
                    this.winner = true;
                    setTimeout(function () { that.game.state.start('Classroom', true, false); }, 3000);
                }
                else {
                    this.userCount = 0;
                    this.currentCount = 0;
                    this.N++;
                    this.simonSez = true;
                }
            }
        }
        else {
            this.tryAgain = true;
            this.userCount = 0;
            this.currentCount = 0;
            setTimeout(function () { that.simonSequence(); }, 3000);
        }
    };
    Board.prototype.simonSequence = function () {
        this.simonSez = true;
        this.litSquare = this.sequenceList[this.currentCount];
        this.simon.getAt(this.litSquare).shine();
        this.timeCheck = this.game.time.now;
        if (!this.tryAgain) {
            this.currentCount++;
        }
        this.tryAgain = false;
    };
    Board.prototype.setUp = function () {
        if (!this.sequenceList.length) {
            for (var i = 0; i < this.sequenceCount; i++) {
                var thisSquare = this.game.rnd.integerInRange(0, this.tileCount - 1);
                this.sequenceList.push(thisSquare);
            }
        }
        this.timeLastAction = this.game.time.now;
    };
    Board.prototype.select = function (item, pointer) {
        this.stopHint();
        if (!this.simonSez && !this.intro && !this.tryAgain && !this.winner) {
            item.shine();
        }
    };
    Board.prototype.release = function (item, pointer) {
        if (!this.simonSez && !this.intro && !this.tryAgain && !this.winner) {
            item.fade();
            this.playerSequence(item);
        }
    };
    Board.prototype.moveOff = function (item, pointer) {
        if (!this.simonSez && !this.intro && !this.tryAgain && !this.winner) {
            item.fade();
        }
    };
    Board.prototype.restart = function () {
        var that = this;
        this.simonSez = false;
        this.N = 1;
        this.userCount = 0;
        this.currentCount = 0;
        this.sequenceList = [];
        this.winner = false;
        this.tryAgain = false;
    };
    Board.prototype.render = function () {
        if (!this.intro) {
            if (this.simonSez) {
                this.game.debug.text('Glitch!', 360, 96, 'rgb(255,0,0)');
            }
            else {
                this.game.debug.text('Fix!', 360, 96, 'rgb(0,255,0)');
            }
        }
        else {
            this.game.debug.text('Get Ready', 360, 96, 'rgb(0,0,255)');
        }
        if (this.winner) {
            this.game.debug.text('You Win!', 360, 32, 'rgb(0,0,255)');
        }
        else if (this.tryAgain) {
            this.game.debug.text('Try again!', 360, 32, 'rgb(0,0,255)');
        }
    };
    Board.prototype.shutdown = function () {
        this.music.destroy();
    };
    return Board;
}(Phaser.State));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Board;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Board_1 = __webpack_require__(0);
var ClassRoom = (function (_super) {
    __extends(ClassRoom, _super);
    function ClassRoom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassRoom.prototype.create = function () {
        this.game.add.image(0, 0, 'world-map-bg');
        this.menu = this.game.add.group();
        var menuItem = this.menu.create(100, 100, 'item', 1);
        var menuItem2 = this.menu.create(250, 350, 'item', 3);
        var menuItem3 = this.menu.create(550, 150, 'item', 5);
        menuItem.inputEnabled = true;
        menuItem.input.start(0, true);
        menuItem.events.onInputUp.add(function () {
            Board_1.default.start(this.game, { tileCount: 4, sequenceCount: 4, bg: 'paris-bg' });
        }, this);
        menuItem2.inputEnabled = true;
        menuItem2.input.start(0, true);
        menuItem2.events.onInputUp.add(function () {
            Board_1.default.start(this.game, { tileCount: 4, sequenceCount: 4, bg: 'russia-bg' });
        }, this);
        menuItem3.inputEnabled = true;
        menuItem3.input.start(0, true);
        menuItem3.events.onInputUp.add(function () {
            Board_1.default.start(this.game, { tileCount: 4, sequenceCount: 4, bg: 'london-bg' });
        }, this);
    };
    return ClassRoom;
}(Phaser.State));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClassRoom;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ClassRoom = (function (_super) {
    __extends(ClassRoom, _super);
    function ClassRoom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassRoom.prototype.create = function () {
        this.game.add.image(0, 0, 'funky-facts-splash');
    };
    return ClassRoom;
}(Phaser.State));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClassRoom;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tile.prototype.blinkStart = function () {
        this.blinkTween = this.game.add.tween(this).to({ alpha: .75 }, 500, Phaser.Easing.Linear.None, true, 0, 4, true);
        var final = this.game.add.tween(this).to({ alpha: .25 }, 500, Phaser.Easing.Linear.None, true);
        this.blinkTween.chain(final);
        this.blinkTween.repeat(-1);
        this.blinkTween.start();
        return this.blinkTween;
    };
    Tile.prototype.blinkStop = function () {
        this.blinkTween.stop();
    };
    Tile.prototype.fade = function () {
        this.alpha = .5;
    };
    Tile.prototype.shine = function () {
        this.alpha = 1;
    };
    return Tile;
}(Phaser.Sprite));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tile;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.TILE_WIDTH = 150;
exports.TILE_HEIGHT = 150;
exports.TILE_PADDING = 20;
// export const SPRITE_BLOCK_X = 150 + 168;
// export const SPRITE_BLOCK_TOP_Y = 150;
exports.SPRITE_BLOCK_BOTTOM_Y = 318;
exports.SPRITE_BLOCK_COUNT = 6;
exports.STOP_PADDING = 150;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Board_1 = __webpack_require__(0);
var Classroom_1 = __webpack_require__(1);
var FunkyFacts_1 = __webpack_require__(2);
var GoSimon = (function () {
    function GoSimon() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create
        });
    }
    GoSimon.prototype.preload = function () {
        this.game.load.spritesheet('item', 'assets/number-buttons.png', 160, 160);
        this.game.load.image('bg', 'assets/sky4.png');
        this.game.load.image('funky-facts-splash', 'assets/ubercorn-facts.png');
        this.game.load.image('paris-bg', 'assets/paris.jpg');
        this.game.load.image('russia-bg', 'assets/russia.jpg');
        this.game.load.image('london-bg', 'assets/london-bg.jpg');
        this.game.load.image('world-map-bg', 'assets/world-map-bg.png');
        this.game.load.audio('disco1', 'assets/funk.mp3');
        this.game.load.audio('disco2', 'assets/funk2.mp3');
    };
    GoSimon.prototype.create = function () {
        this.game.add.image(0, 0, 'bg');
        this.game.state.add('Classroom', Classroom_1.default);
        this.game.state.add('Board', Board_1.default);
        this.game.state.add('FunckFacts', FunkyFacts_1.default);
        this.game.state.start('Classroom', true, false);
    };
    return GoSimon;
}());
// when the page has finished loading, create our game
window.onload = function () {
    var game = new GoSimon();
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGY2MGE2ZTAwZDI4NzBhMmQ1NTciLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlcy9Cb2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGVzL0NsYXNzcm9vbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGVzL0Z1bmt5RmFjdHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvVGlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9HYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hFQSx5Q0FBeUY7QUFDekYsb0NBQW1DO0FBQ25DO0lBQW1DLHlCQUFZO0lBQS9DO1FBQUEscUVBK09DO1FBN09HLE9BQUMsR0FBRyxDQUFDLENBQUM7UUFDTixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2Qsa0JBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsbUJBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsa0JBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsY0FBUSxHQUFHLEtBQUssQ0FBQzs7SUF3T3JCLENBQUM7SUE1Tkcsb0JBQUksR0FB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QixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELHdCQUFNLEdBQU47UUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLG1CQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGVBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsb0JBQVUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRixjQUFDO0FBQUQsQ0FBQztBQUVELHNEQUFzRDtBQUN0RCxNQUFNLENBQUMsTUFBTSxHQUFHO0lBQ2YsSUFBSSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUMxQixDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDhmNjBhNmUwMGQyODcwYTJkNTU3IiwiaW1wb3J0IHsgU1BSSVRFX0JMT0NLX0NPVU5ULCBUSUxFX1dJRFRILCBUSUxFX0hFSUdIVCwgVElMRV9QQURESU5HIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBUaWxlIGZyb20gJy4uL2NsYXNzZXMvVGlsZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XG4gICAgc2ltb246UGhhc2VyLkdyb3VwO1xuICAgIE4gPSAxO1xuICAgIHVzZXJDb3VudCA9IDA7XG4gICAgY3VycmVudENvdW50ID0gMDtcbiAgICBzZXF1ZW5jZUNvdW50ID0gNDtcbiAgICBzZXF1ZW5jZUxpc3QgPSBbXTtcbiAgICBzaW1vblNleiA9IGZhbHNlO1xuICAgIHRpbWVDaGVjaztcbiAgICBsaXRTcXVhcmU7XG4gICAgd2lubmVyO1xuICAgIHRyeUFnYWluO1xuICAgIGludHJvO1xuICAgIHRpbGVDb3VudDtcbiAgICBnYW1lOlBoYXNlci5HYW1lO1xuICAgIHRpbWVMYXN0QWN0aW9uO1xuICAgIGhpbnRpbmdUaWxlOlRpbGU7XG4gICAgbXVzaWM6UGhhc2VyLlNvdW5kO1xuXG4gICAgaW5pdCh7IHRpbGVDb3VudCA9IDgsIHNlcXVlbmNlQ291bnQgPSA0LCBzZXF1ZW5jZUxpc3QgPSBbXSwgYmcgfSkge1xuICAgICAgICB0aGlzLnRpbGVDb3VudCA9IHRpbGVDb3VudDtcbiAgICAgICAgdGhpcy5zZXF1ZW5jZUNvdW50ID0gc2VxdWVuY2VDb3VudDtcbiAgICAgICAgdGhpcy5zZXF1ZW5jZUxpc3QgPSBzZXF1ZW5jZUxpc3Q7XG4gICAgICAgIHRoaXMuZ2FtZS5hZGQuaW1hZ2UoMCwgMCwgYmcgfHwgJ2JnJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzdGFydCAoZ2FtZSwgY29uZmlnID0ge30pIHtcbiAgICAgICAgZ2FtZS5zdGF0ZS5zdGFydCgnRnVuY2tGYWN0cycsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnYW1lLnN0YXRlLnN0YXJ0KCdCb2FyZCcsIHRydWUsIGZhbHNlLCBjb25maWcpO1xuICAgICAgICB9LCAzMDAwKTsgICBcbiAgICB9XG5cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5tdXNpYyA9IHRoaXMuZ2FtZS5hZGQuYXVkaW8oJ2Rpc2NvMicpO1xuICAgICAgICB0aGlzLm11c2ljLnBsYXkoKTtcbiAgICAgICAgdGhpcy5idWlsZEJvYXJkKCk7XG4gICAgICAgIHRoaXMucmVzdGFydCgpO1xuICAgICAgICB0aGlzLnNldFVwKCk7XG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpe3RoYXQuc2ltb25TZXF1ZW5jZSgpOyB0aGF0LmludHJvID0gZmFsc2U7fSwgMTAwMCk7XG4gICAgfVxuXG4gICAgc3RvcEhpbnQoKSB7XG4gICAgICAgIGlmKHRoaXMuaGludGluZ1RpbGUgJiYgdGhpcy5oaW50aW5nVGlsZS5ibGlua1R3ZWVuLmlzUnVubmluZykge1xuICAgICAgICAgICAgdGhpcy5oaW50aW5nVGlsZS5ibGlua1N0b3AoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlcyBvbmUgdGlsZSBibGluayB1bnRpbCB0aGUgc3RvcEhpbnQgbWV0aG9kIGlzIGNhbGxlZFxuICAgICAqL1xuICAgIGhpbnROZXh0QnV0dG9uKCkge1xuICAgICAgICBpZighdGhpcy5oaW50aW5nVGlsZSB8fCAhdGhpcy5oaW50aW5nVGlsZS5ibGlua1R3ZWVuLmlzUnVubmluZykge1xuICAgICAgICAgICAgdGhpcy5oaW50aW5nVGlsZSA9IHRoaXMuc2ltb24uZ2V0QXQodGhpcy5zZXF1ZW5jZUxpc3RbdGhpcy51c2VyQ291bnRdKTtcbiAgICAgICAgICAgIHRoaXMuaGludGluZ1RpbGUuYmxpbmtTdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaW50cm9Ud2VlbigpIHtcbiAgICAvLyAgICAgdGhpcy5pbnRybyA9IHRydWU7XG4gICAgLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50aWxlQ291bnQ7IGkrKykge1xuICAgIC8vICAgICAgICAgdmFyIGZsYXNoaW5nID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLnNpbW9uLmdldEF0KGkpKS50byggeyBhbHBoYTogMSB9LCA1MDAsIFBoYXNlci5FYXNpbmcuTGluZWFyLk5vbmUsIHRydWUsIDAsIDQsIHRydWUpO1xuICAgIC8vICAgICAgICAgdmFyIGZpbmFsID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLnNpbW9uLmdldEF0KGkpKS50byggeyBhbHBoYTogLjI1IH0sIDUwMCwgUGhhc2VyLkVhc2luZy5MaW5lYXIuTm9uZSwgdHJ1ZSk7XG4gICAgLy8gICAgICAgICBmbGFzaGluZy5jaGFpbihmaW5hbCk7XG4gICAgLy8gICAgICAgICBmbGFzaGluZy5zdGFydCgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgZ2V0UmFuZG9tQmxvY2soKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBTUFJJVEVfQkxPQ0tfQ09VTlQpO1xuICAgIH1cblxuICAgIGdldEdyaWRTZXR0aW5nKCkge1xuICAgICAgICBjb25zdCByb3dJdGVtQ291bnQgPSB0aGlzLnRpbGVDb3VudCAvIDI7XG4gICAgICAgIGNvbnN0IGdhbWVXaWR0aCA9IHRoaXMuZ2FtZS53aWR0aDtcbiAgICAgICAgY29uc3QgYm9hcmRXaWR0aCA9IChyb3dJdGVtQ291bnQgKiBUSUxFX1dJRFRIKSArIChyb3dJdGVtQ291bnQgKiBUSUxFX1BBRERJTkcpO1xuICAgICAgICBjb25zdCBib2FyZFBhZGRpbmcgPSAoZ2FtZVdpZHRoIC0gYm9hcmRXaWR0aCkgLyAyO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYm9hcmRQYWRkaW5nXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidWlsZEJvYXJkICgpIHtcbiAgICAgICAgdGhpcy5zaW1vbiA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICAgICAgdmFyIGl0ZW06UGhhc2VyLlNwcml0ZTtcbiAgICAgICAgY29uc3Qgcm93TGVuZ3RoID0gdGhpcy50aWxlQ291bnQgLyAyO1xuICAgICAgICBjb25zdCBncmlkU2V0dGluZ3MgPSB0aGlzLmdldEdyaWRTZXR0aW5nKCk7XG5cbiAgICAgICAgdGhpcy5idWlsZFJvdyh7IHJvd0xlbmd0aCwgZ3JpZFNldHRpbmdzLCByb3dOdW1iZXI6IDEgfSk7XG4gICAgICAgIHRoaXMuYnVpbGRSb3coeyByb3dMZW5ndGgsIGdyaWRTZXR0aW5ncywgcm93TnVtYmVyOiAyIH0pO1xuICAgIH1cblxuICAgIGJ1aWxkUm93KHtyb3dMZW5ndGgsIGdyaWRTZXR0aW5ncywgcm93TnVtYmVyfSkge1xuICAgICAgICB2YXIgaXRlbTpQaGFzZXIuU3ByaXRlO1xuICAgICAgICBsZXQgeSA9IDE1MCAqIHJvd051bWJlcjtcbiAgICAgICAgaWYgKHJvd051bWJlciA+IDEpIHtcbiAgICAgICAgICAgIHkgKz0gVElMRV9QQURESU5HXG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaXRlbSA9IG5ldyBUaWxlKHRoaXMuZ2FtZSwgZ3JpZFNldHRpbmdzLmJvYXJkUGFkZGluZyArIChUSUxFX1dJRFRIICsgVElMRV9QQURESU5HKSAqIGksIHksICdpdGVtJywgdGhpcy5nZXRSYW5kb21CbG9jaygpKTtcbiAgICAgICAgICAgIC8vIEVuYWJsZSBpbnB1dC5cbiAgICAgICAgICAgIGl0ZW0uaW5wdXRFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGl0ZW0uaW5wdXQuc3RhcnQoMCwgdHJ1ZSk7XG4gICAgICAgICAgICBpdGVtLmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy5zZWxlY3QsIHRoaXMpO1xuICAgICAgICAgICAgaXRlbS5ldmVudHMub25JbnB1dFVwLmFkZCh0aGlzLnJlbGVhc2UsIHRoaXMpO1xuICAgICAgICAgICAgaXRlbS5ldmVudHMub25JbnB1dE91dC5hZGQodGhpcy5tb3ZlT2ZmLCB0aGlzKTtcbiAgICAgICAgICAgIGl0ZW0uZmFkZSgpO1xuICAgICAgICAgICAgdGhpcy5zaW1vbi5hZGQoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuc2ltb25TZXopIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUudGltZS5ub3cgLSB0aGlzLnRpbWVDaGVjayA+IDcwMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpdFNxdWFyZSA9IHRoaXMuc2ltb24uZ2V0QXQodGhpcy5saXRTcXVhcmUpO1xuICAgICAgICAgICAgICAgIGlmIChsaXRTcXVhcmUuYWxwaGEgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGl0U3F1YXJlLmZhZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lQ2hlY2sgPSB0aGlzLmdhbWUudGltZS5ub3c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuY3VycmVudENvdW50IDwgdGhhdC5OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGF0LmdhbWUucGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNpbW9uU2VxdWVuY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2ltb25TZXogPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoYXQuZ2FtZS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUudGltZS5ub3cgLSB0aGlzLnRpbWVMYXN0QWN0aW9uID4gMTAwMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVMYXN0QWN0aW9uID0gdGhpcy5nYW1lLnRpbWUubm93O1xuICAgICAgICAgICAgICAgIHRoaXMuaGludE5leHRCdXR0b24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBsYXllclNlcXVlbmNlKHNlbGVjdGVkKSB7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgY29uc3QgY29ycmVjdFNxdWFyZSA9IHRoaXMuc2VxdWVuY2VMaXN0W3RoaXMudXNlckNvdW50XTtcbiAgICAgICAgdGhpcy51c2VyQ291bnQrKztcbiAgICAgICAgY29uc3QgdGhpc1NxdWFyZSA9IHRoaXMuc2ltb24uZ2V0SW5kZXgoc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLnRpbWVMYXN0QWN0aW9uID0gdGhpcy5nYW1lLnRpbWUubm93O1xuXG4gICAgICAgIGlmICh0aGlzU3F1YXJlID09IGNvcnJlY3RTcXVhcmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJDb3VudCA9PSB0aGlzLk4pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5OID09IHRoaXMuc2VxdWVuY2VDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndpbm5lciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aGF0LmdhbWUuc3RhdGUuc3RhcnQoJ0NsYXNzcm9vbScsIHRydWUsIGZhbHNlKTt9LCAzMDAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OKys7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2ltb25TZXogPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJ5QWdhaW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy51c2VyQ291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q291bnQgPSAwO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3RoYXQuc2ltb25TZXF1ZW5jZSgpO30sIDMwMDApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzaW1vblNlcXVlbmNlICgpIHtcbiAgICAgICAgdGhpcy5zaW1vblNleiA9IHRydWU7XG4gICAgICAgIHRoaXMubGl0U3F1YXJlID0gdGhpcy5zZXF1ZW5jZUxpc3RbdGhpcy5jdXJyZW50Q291bnRdO1xuICAgICAgICB0aGlzLnNpbW9uLmdldEF0KHRoaXMubGl0U3F1YXJlKS5zaGluZSgpO1xuICAgICAgICB0aGlzLnRpbWVDaGVjayA9IHRoaXMuZ2FtZS50aW1lLm5vdztcbiAgICAgICAgaWYgKCF0aGlzLnRyeUFnYWluKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJ5QWdhaW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZXRVcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlcXVlbmNlTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXF1ZW5jZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGlzU3F1YXJlID0gdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgwLHRoaXMudGlsZUNvdW50IC0gMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZUxpc3QucHVzaCh0aGlzU3F1YXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWVMYXN0QWN0aW9uID0gdGhpcy5nYW1lLnRpbWUubm93O1xuICAgIH1cblxuICAgIHNlbGVjdChpdGVtLCBwb2ludGVyKSB7XG4gICAgICAgIHRoaXMuc3RvcEhpbnQoKTtcbiAgICAgICAgaWYgKCF0aGlzLnNpbW9uU2V6ICYmICF0aGlzLmludHJvICYmICF0aGlzLnRyeUFnYWluICYmICF0aGlzLndpbm5lcikge1xuICAgICAgICAgICAgaXRlbS5zaGluZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVsZWFzZShpdGVtLCBwb2ludGVyKSB7XG4gICAgICAgIGlmICghdGhpcy5zaW1vblNleiAmJiAhdGhpcy5pbnRybyAmJiAhdGhpcy50cnlBZ2FpbiAmJiAhdGhpcy53aW5uZXIpIHtcbiAgICAgICAgICAgIGl0ZW0uZmFkZSgpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJTZXF1ZW5jZShpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVPZmYoaXRlbSwgcG9pbnRlcikge1xuICAgICAgICBpZiAoIXRoaXMuc2ltb25TZXogJiYgIXRoaXMuaW50cm8gJiYgIXRoaXMudHJ5QWdhaW4gJiYgIXRoaXMud2lubmVyKSB7XG4gICAgICAgICAgICBpdGVtLmZhZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RhcnQoKSB7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5zaW1vblNleiA9IGZhbHNlO1xuICAgICAgICB0aGlzLk4gPSAxO1xuICAgICAgICB0aGlzLnVzZXJDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuY3VycmVudENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5zZXF1ZW5jZUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy53aW5uZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50cnlBZ2FpbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmludHJvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaW1vblNleikge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KCdHbGl0Y2ghJywgMzYwLCA5NiwgJ3JnYigyNTUsMCwwKScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuZGVidWcudGV4dCgnRml4IScsIDM2MCwgOTYsICdyZ2IoMCwyNTUsMCknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KCdHZXQgUmVhZHknLCAzNjAsIDk2LCAncmdiKDAsMCwyNTUpJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53aW5uZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KCdZb3UgV2luIScsIDM2MCwgMzIsICdyZ2IoMCwwLDI1NSknKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyeUFnYWluKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuZGVidWcudGV4dCgnVHJ5IGFnYWluIScsIDM2MCwgMzIsICdyZ2IoMCwwLDI1NSknKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNodXRkb3duKCkge1xuICAgICAgICB0aGlzLm11c2ljLmRlc3Ryb3koKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9zdGF0ZXMvQm9hcmQudHMiLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc1Jvb20gZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuICAgIG1lbnU6UGhhc2VyLkdyb3VwO1xuICAgIGdhbWU6UGhhc2VyLkdhbWU7XG4gICAgY3JlYXRlKCkge1xuICAgICAgICB0aGlzLmdhbWUuYWRkLmltYWdlKDAsIDAsICd3b3JsZC1tYXAtYmcnKTtcbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgICBjb25zdCBtZW51SXRlbSA9IHRoaXMubWVudS5jcmVhdGUoMTAwLCAxMDAsICdpdGVtJywgMSk7XG4gICAgICAgIGNvbnN0IG1lbnVJdGVtMiA9IHRoaXMubWVudS5jcmVhdGUoMjUwLCAzNTAsICdpdGVtJywgMyk7XG4gICAgICAgIGNvbnN0IG1lbnVJdGVtMyA9IHRoaXMubWVudS5jcmVhdGUoNTUwLCAxNTAsICdpdGVtJywgNSk7XG5cbiAgICAgICAgbWVudUl0ZW0uaW5wdXRFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgbWVudUl0ZW0uaW5wdXQuc3RhcnQoMCwgdHJ1ZSk7XG4gICAgICAgIG1lbnVJdGVtLmV2ZW50cy5vbklucHV0VXAuYWRkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEJvYXJkLnN0YXJ0KHRoaXMuZ2FtZSwge3RpbGVDb3VudDogNCwgc2VxdWVuY2VDb3VudDogNCwgYmc6ICdwYXJpcy1iZyd9KTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIG1lbnVJdGVtMi5pbnB1dEVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBtZW51SXRlbTIuaW5wdXQuc3RhcnQoMCwgdHJ1ZSk7XG4gICAgICAgIG1lbnVJdGVtMi5ldmVudHMub25JbnB1dFVwLmFkZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBCb2FyZC5zdGFydCh0aGlzLmdhbWUsIHt0aWxlQ291bnQ6IDQsIHNlcXVlbmNlQ291bnQ6IDQsIGJnOiAncnVzc2lhLWJnJ30pO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgbWVudUl0ZW0zLmlucHV0RW5hYmxlZCA9IHRydWU7XG4gICAgICAgIG1lbnVJdGVtMy5pbnB1dC5zdGFydCgwLCB0cnVlKTtcbiAgICAgICAgbWVudUl0ZW0zLmV2ZW50cy5vbklucHV0VXAuYWRkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEJvYXJkLnN0YXJ0KHRoaXMuZ2FtZSwge3RpbGVDb3VudDogNCwgc2VxdWVuY2VDb3VudDogNCwgYmc6ICdsb25kb24tYmcnfSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vc3JjL3N0YXRlcy9DbGFzc3Jvb20udHMiLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc1Jvb20gZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuICAgIG1lbnU6UGhhc2VyLkdyb3VwO1xuICAgIGdhbWU6UGhhc2VyLkdhbWU7XG4gICAgY3JlYXRlKCkge1xuICAgICAgICB0aGlzLmdhbWUuYWRkLmltYWdlKDAsIDAsICdmdW5reS1mYWN0cy1zcGxhc2gnKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9zdGF0ZXMvRnVua3lGYWN0cy50cyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgICBibGlua1R3ZWVuOlBoYXNlci5Ud2VlbjtcblxuICAgIGJsaW5rU3RhcnQoKSB7XG4gICAgICAgIHRoaXMuYmxpbmtUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcykudG8oIHsgYWxwaGE6IC43NSB9LCA1MDAsIFBoYXNlci5FYXNpbmcuTGluZWFyLk5vbmUsIHRydWUsIDAsIDQsIHRydWUpO1xuICAgICAgICB2YXIgZmluYWwgPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpLnRvKCB7IGFscGhhOiAuMjUgfSwgNTAwLCBQaGFzZXIuRWFzaW5nLkxpbmVhci5Ob25lLCB0cnVlKTtcbiAgICAgICAgdGhpcy5ibGlua1R3ZWVuLmNoYWluKGZpbmFsKTtcbiAgICAgICAgdGhpcy5ibGlua1R3ZWVuLnJlcGVhdCgtMSk7XG4gICAgICAgIHRoaXMuYmxpbmtUd2Vlbi5zdGFydCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5ibGlua1R3ZWVuO1xuICAgIH1cblxuICAgIGJsaW5rU3RvcCgpIHtcbiAgICAgICAgdGhpcy5ibGlua1R3ZWVuLnN0b3AoKTtcbiAgICB9XG5cbiAgICBmYWRlKCkge1xuICAgICAgICB0aGlzLmFscGhhID0gLjU7XG4gICAgfVxuXG4gICAgc2hpbmUoKSB7XG4gICAgICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vc291cmNlLW1hcC1sb2FkZXIhLi9zcmMvY2xhc3Nlcy9UaWxlLnRzIiwiZXhwb3J0IGNvbnN0IFRJTEVfV0lEVEggPSAxNTA7XG5leHBvcnQgY29uc3QgVElMRV9IRUlHSFQgPSAxNTA7XG5leHBvcnQgY29uc3QgVElMRV9QQURESU5HID0gMjA7XG4vLyBleHBvcnQgY29uc3QgU1BSSVRFX0JMT0NLX1ggPSAxNTAgKyAxNjg7XG4vLyBleHBvcnQgY29uc3QgU1BSSVRFX0JMT0NLX1RPUF9ZID0gMTUwO1xuZXhwb3J0IGNvbnN0IFNQUklURV9CTE9DS19CT1RUT01fWSA9IDMxODtcbmV4cG9ydCBjb25zdCBTUFJJVEVfQkxPQ0tfQ09VTlQgPSA2O1xuZXhwb3J0IGNvbnN0IFNUT1BfUEFERElORyA9IDE1MDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vc3JjL2NvbnN0YW50cy50cyIsImltcG9ydCBCb2FyZCBmcm9tICcuL3N0YXRlcy9Cb2FyZCc7XG5pbXBvcnQgQ2xhc3Nyb29tIGZyb20gJy4vc3RhdGVzL0NsYXNzcm9vbSc7XG5pbXBvcnQgRnVua3lGYWN0cyBmcm9tICcuL3N0YXRlcy9GdW5reUZhY3RzJztcbmNsYXNzIEdvU2ltb24ge1xuXHRnYW1lOlBoYXNlci5HYW1lO1xuXHRib2FyZDpCb2FyZDtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoIDgwMCwgNjAwLCBQaGFzZXIuQVVUTywgJ2NvbnRlbnQnLCB7XG5cdFx0XHRwcmVsb2FkOiB0aGlzLnByZWxvYWQsXG5cdFx0XHRjcmVhdGU6IHRoaXMuY3JlYXRlXG5cdFx0fSk7ICAgICAgICBcblx0fVxuXG5cdHByZWxvYWQoKSB7XG5cdFx0dGhpcy5nYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2l0ZW0nLCAnYXNzZXRzL251bWJlci1idXR0b25zLnBuZycsIDE2MCwgMTYwKTtcblx0XHR0aGlzLmdhbWUubG9hZC5pbWFnZSgnYmcnLCAnYXNzZXRzL3NreTQucG5nJyk7XG5cdFx0dGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2Z1bmt5LWZhY3RzLXNwbGFzaCcsICdhc3NldHMvdWJlcmNvcm4tZmFjdHMucG5nJyk7XG5cdFx0dGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ3BhcmlzLWJnJywgJ2Fzc2V0cy9wYXJpcy5qcGcnKTtcblx0XHR0aGlzLmdhbWUubG9hZC5pbWFnZSgncnVzc2lhLWJnJywgJ2Fzc2V0cy9ydXNzaWEuanBnJyk7XG5cdFx0dGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2xvbmRvbi1iZycsICdhc3NldHMvbG9uZG9uLWJnLmpwZycpO1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmltYWdlKCd3b3JsZC1tYXAtYmcnLCAnYXNzZXRzL3dvcmxkLW1hcC1iZy5wbmcnKTtcblx0XHR0aGlzLmdhbWUubG9hZC5hdWRpbygnZGlzY28xJywgJ2Fzc2V0cy9mdW5rLm1wMycpO1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmF1ZGlvKCdkaXNjbzInLCAnYXNzZXRzL2Z1bmsyLm1wMycpO1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuZ2FtZS5hZGQuaW1hZ2UoMCwgMCwgJ2JnJyk7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLmFkZCgnQ2xhc3Nyb29tJywgQ2xhc3Nyb29tKTtcblx0XHR0aGlzLmdhbWUuc3RhdGUuYWRkKCdCb2FyZCcsIEJvYXJkKTtcblx0XHR0aGlzLmdhbWUuc3RhdGUuYWRkKCdGdW5ja0ZhY3RzJywgRnVua3lGYWN0cyk7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdDbGFzc3Jvb20nLCB0cnVlLCBmYWxzZSk7XG5cdH1cbn1cblxuLy8gd2hlbiB0aGUgcGFnZSBoYXMgZmluaXNoZWQgbG9hZGluZywgY3JlYXRlIG91ciBnYW1lXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuXHR2YXIgZ2FtZSA9IG5ldyBHb1NpbW9uKCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9HYW1lLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==