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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
var constants_1 = __webpack_require__(2);
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
        var _b = _a.tileCount, tileCount = _b === void 0 ? 8 : _b, _c = _a.sequenceCount, sequenceCount = _c === void 0 ? 4 : _c;
        this.tileCount = tileCount;
        this.tileCount = tileCount;
        this.game.add.image(0, 0, 'bg');
    };
    Board.prototype.create = function () {
        var that = this;
        this.buildBoard();
        this.restart();
        // this.introTween();
        this.setUp();
        setTimeout(function () { that.simonSequence(); that.intro = false; }, 1000);
    };
    Board.prototype.stopHint = function () {
        if (this.hintingTile && this.hintingTile.isRunning) {
            this.hintingTile.stop();
        }
    };
    Board.prototype.hintNextButton = function () {
        if (!this.hintingTile || !this.hintingTile.isRunning) {
            this.hintingTile = this.game.add.tween(this.simon.getAt(this.sequenceList[this.userCount])).to({ alpha: .75 }, 500, Phaser.Easing.Linear.None, true, 0, 4, true);
            var final = this.game.add.tween(this.simon.getAt(this.sequenceList[this.userCount])).to({ alpha: .25 }, 500, Phaser.Easing.Linear.None, true);
            this.hintingTile.chain(final);
            this.hintingTile.repeat(-1);
            this.hintingTile.start();
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
            item = this.simon.create(gridSettings.boardPadding + (constants_1.TILE_WIDTH + constants_1.TILE_PADDING) * i, y, 'item', this.getRandomBlock());
            // Enable input.
            item.inputEnabled = true;
            item.input.start(0, true);
            item.events.onInputDown.add(this.select, this);
            item.events.onInputUp.add(this.release, this);
            item.events.onInputOut.add(this.moveOff, this);
            this.simon.getAt(i * rowNumber).alpha = .25;
        }
    };
    Board.prototype.update = function () {
        var that = this;
        if (this.simonSez) {
            if (this.game.time.now - this.timeCheck > 700 - this.N * 40) {
                this.simon.getAt(this.litSquare).alpha = .25;
                this.game.paused = true;
                setTimeout(function () {
                    if (that.currentCount < that.N) {
                        that.game.paused = false;
                        that.simonSequence();
                    }
                    else {
                        that.simonSez = false;
                        that.game.paused = false;
                    }
                }, 400 - that.N * 20);
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
        this.simon.getAt(this.litSquare).alpha = 1;
        this.timeCheck = this.game.time.now;
        if (!this.tryAgain) {
            this.currentCount++;
        }
        this.tryAgain = false;
    };
    Board.prototype.setUp = function () {
        for (var i = 0; i < this.sequenceCount; i++) {
            var thisSquare = this.game.rnd.integerInRange(0, this.tileCount - 1);
            this.sequenceList.push(thisSquare);
        }
        this.timeLastAction = this.game.time.now;
    };
    Board.prototype.select = function (item, pointer) {
        this.stopHint();
        if (!this.simonSez && !this.intro && !this.tryAgain && !this.winner) {
            item.alpha = 1;
        }
    };
    Board.prototype.release = function (item, pointer) {
        if (!this.simonSez && !this.intro && !this.tryAgain && !this.winner) {
            item.alpha = .25;
            this.playerSequence(item);
        }
    };
    Board.prototype.moveOff = function (item, pointer) {
        if (!this.simonSez && !this.intro && !this.tryAgain && !this.winner) {
            item.alpha = .25;
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
    return Board;
}(Phaser.State));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Board;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Board_1 = __webpack_require__(0);
var Classroom_1 = __webpack_require__(3);
var GoSimon = (function () {
    function GoSimon() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }
    GoSimon.prototype.preload = function () {
        this.game.load.spritesheet('item', 'assets/number-buttons.png', 160, 160);
        this.game.load.image('bg', 'assets/sky4.png');
    };
    GoSimon.prototype.create = function () {
        this.game.add.image(0, 0, 'bg');
        this.game.state.add('Classroom', Classroom_1.default);
        this.game.state.add('Board', Board_1.default);
        this.game.state.start('Classroom', true, false);
    };
    GoSimon.prototype.update = function () {
    };
    GoSimon.prototype.render = function () {
    };
    return GoSimon;
}());
// when the page has finished loading, create our game
window.onload = function () {
    var game = new GoSimon();
};


/***/ }),
/* 2 */
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
/* 3 */
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
        this.game.add.image(0, 0, 'bg');
        this.menu = this.game.add.group();
        var menuItem = this.menu.create(100, 100, 'item', 1);
        var menuItem2 = this.menu.create(250, 350, 'item', 3);
        var menuItem3 = this.menu.create(550, 150, 'item', 5);
        menuItem.inputEnabled = true;
        menuItem.input.start(0, true);
        menuItem.events.onInputUp.add(function () {
            this.game.state.start('Board', true, false, { tileCount: 2, sequenceCount: 4 });
        }, this);
        menuItem2.inputEnabled = true;
        menuItem2.input.start(0, true);
        menuItem2.events.onInputUp.add(function () {
            this.game.state.start('Board', true, false, { tileCount: 4, sequenceCount: 4 });
        }, this);
        menuItem3.inputEnabled = true;
        menuItem3.input.start(0, true);
        menuItem3.events.onInputUp.add(function () {
            this.game.state.start('Board', true, false, { tileCount: 6, sequenceCount: 4 });
        }, this);
    };
    return ClassRoom;
}(Phaser.State));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClassRoom;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWFkYmRjNzdmNGYzOTMxMzYwN2IiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JvYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9HYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NsYXNzcm9vbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNoRUEseUNBQXdGO0FBQ3hGO0lBQW1DLHlCQUFZO0lBQS9DO1FBQUEscUVBeU9DO1FBdk9HLE9BQUMsR0FBRyxDQUFDLENBQUM7UUFDTixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2Qsa0JBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsbUJBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsa0JBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsY0FBUSxHQUFHLEtBQUssQ0FBQzs7SUFrT3JCLENBQUM7SUF2Tkcsb0JBQUksR0FBSixVQUFLLEVBQW9DO1lBQWxDLGlCQUFhLEVBQWIsa0NBQWEsRUFBRSxxQkFBaUIsRUFBakIsc0NBQWlCO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxzQkFBTSxHQUFOO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixxQkFBcUI7UUFDckIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsVUFBVSxDQUNOLGNBQVcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCx3QkFBUSxHQUFSO1FBQ0ksRUFBRSxFQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsQ0FBQztJQUNMLENBQUM7SUFFRCw4QkFBYyxHQUFkO1FBQ0ksRUFBRSxFQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEssSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsQ0FBQztJQUNMLENBQUM7SUFFRCxpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLGlEQUFpRDtJQUNqRCx1SUFBdUk7SUFDdkksMEhBQTBIO0lBQzFILGlDQUFpQztJQUNqQyw0QkFBNEI7SUFDNUIsUUFBUTtJQUNSLElBQUk7SUFFSiw4QkFBYyxHQUFkO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLDhCQUFrQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELDhCQUFjLEdBQWQ7UUFDSSxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFNLFVBQVUsR0FBRyxDQUFDLFlBQVksR0FBRyxzQkFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsd0JBQVksQ0FBQyxDQUFDO1FBQy9FLElBQU0sWUFBWSxHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUM7WUFDSCxZQUFZO1NBQ2Y7SUFDTCxDQUFDO0lBRUQsMEJBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkMsSUFBSSxJQUFrQixDQUFDO1FBQ3ZCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUUzQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxhQUFFLFlBQVksZ0JBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsYUFBRSxZQUFZLGdCQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCx3QkFBUSxHQUFSLFVBQVMsRUFBb0M7WUFBbkMsd0JBQVMsRUFBRSw4QkFBWSxFQUFFLHdCQUFTO1FBQ3hDLElBQUksSUFBa0IsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLEVBQUUsRUFBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLENBQUMsSUFBSSx3QkFBWTtRQUNyQixDQUFDO1FBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQ2xDLENBQUM7WUFDRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxDQUFDLHNCQUFVLEdBQUcsd0JBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQ3hILGdCQUFnQjtZQUNoQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDaEQsQ0FBQztJQUNMLENBQUM7SUFFRCxzQkFBTSxHQUFOO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBRXhCLFVBQVUsQ0FBQztvQkFDUCxFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDekIsQ0FBQztvQkFDRCxJQUFJLENBQUMsQ0FBQzt3QkFDRixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUM3QixDQUFDO2dCQUNMLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUMxQixDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMxQixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRCw4QkFBYyxHQUFkLFVBQWUsUUFBUTtRQUNuQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBRXpDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxhQUFhLENBQUMsQ0FDaEMsQ0FBQztZQUNHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUM3QixDQUFDO2dCQUNHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUNqQyxDQUFDO29CQUNHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNuQixVQUFVLENBQUMsY0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ25GLENBQUM7Z0JBQ0QsSUFBSSxDQUNKLENBQUM7b0JBQ0csSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7b0JBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO29CQUN0QixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDdEIsVUFBVSxDQUFDLGNBQVcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxDQUFDO0lBRUwsQ0FBQztJQUVELDZCQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BDLEVBQUUsRUFBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELHFCQUFLLEdBQUw7UUFDSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMxQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQzdDLENBQUM7SUFFRCxzQkFBTSxHQUFOLFVBQU8sSUFBSSxFQUFFLE9BQU87UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQztJQUNMLENBQUM7SUFFRCx1QkFBTyxHQUFQLFVBQVEsSUFBSSxFQUFFLE9BQU87UUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBRUQsdUJBQU8sR0FBUCxVQUFRLElBQUksRUFBRSxPQUFPO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7SUFFRCx1QkFBTyxHQUFQO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELHNCQUFNLEdBQU47UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQzFELENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7SUFDTCxDQUFDO0lBQ0wsWUFBQztBQUFELENBQUMsQ0F6T2tDLE1BQU0sQ0FBQyxLQUFLLEdBeU85Qzs7Ozs7Ozs7Ozs7QUMxT0QscUNBQTRCO0FBQzVCLHlDQUFvQztBQUNwQztJQUtDO1FBQ0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNyRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDdEIsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVELHlCQUFPLEdBQVA7UUFDTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLDJCQUEyQixFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELHdCQUFNLEdBQU47UUFDTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLG1CQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGVBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRSx3QkFBTSxHQUFOO0lBQ0EsQ0FBQztJQUVELHdCQUFNLEdBQU47SUFDQSxDQUFDO0lBQ0wsY0FBQztBQUFELENBQUM7QUFFRCxzREFBc0Q7QUFDdEQsTUFBTSxDQUFDLE1BQU0sR0FBRztJQUNmLElBQUksSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7QUFDMUIsQ0FBQzs7Ozs7Ozs7O0FDdENZLGtCQUFVLEdBQUcsR0FBRyxDQUFDO0FBQ2pCLG1CQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLG9CQUFZLEdBQUcsRUFBRSxDQUFDO0FBQy9CLDJDQUEyQztBQUMzQyx5Q0FBeUM7QUFDNUIsNkJBQXFCLEdBQUcsR0FBRyxDQUFDO0FBQzVCLDBCQUFrQixHQUFHLENBQUMsQ0FBQztBQUN2QixvQkFBWSxHQUFHLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNQaEM7SUFBdUMsNkJBQVk7SUFBbkQ7O0lBMEJBLENBQUM7SUF2QkcsMEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFeEQsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDN0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ2xGLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNULFNBQVMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzlCLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQixTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNsRixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDVCxTQUFTLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUM5QixTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDbEYsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxDQTFCc0MsTUFBTSxDQUFDLEtBQUssR0EwQmxEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDlhZGJkYzc3ZjRmMzkzMTM2MDdiIiwiaW1wb3J0IHsgU1BSSVRFX0JMT0NLX0NPVU5ULCBUSUxFX1dJRFRILCBUSUxFX0hFSUdIVCwgVElMRV9QQURESU5HIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuICAgIHNpbW9uOlBoYXNlci5Hcm91cDtcbiAgICBOID0gMTtcbiAgICB1c2VyQ291bnQgPSAwO1xuICAgIGN1cnJlbnRDb3VudCA9IDA7XG4gICAgc2VxdWVuY2VDb3VudCA9IDQ7XG4gICAgc2VxdWVuY2VMaXN0ID0gW107XG4gICAgc2ltb25TZXogPSBmYWxzZTtcbiAgICB0aW1lQ2hlY2s7XG4gICAgbGl0U3F1YXJlO1xuICAgIHdpbm5lcjtcbiAgICB0cnlBZ2FpbjtcbiAgICBpbnRybztcbiAgICB0aWxlQ291bnQ7XG4gICAgZ2FtZTpQaGFzZXIuR2FtZTtcbiAgICB0aW1lTGFzdEFjdGlvbjtcbiAgICBoaW50aW5nVGlsZTpQaGFzZXIuVHdlZW47XG5cbiAgICBpbml0KHsgdGlsZUNvdW50ID0gOCwgc2VxdWVuY2VDb3VudCA9IDQgfSkge1xuICAgICAgICB0aGlzLnRpbGVDb3VudCA9IHRpbGVDb3VudDtcbiAgICAgICAgdGhpcy50aWxlQ291bnQgPSB0aWxlQ291bnQ7XG4gICAgICAgIHRoaXMuZ2FtZS5hZGQuaW1hZ2UoMCwgMCwgJ2JnJyk7XG4gICAgfVxuXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoaXMuYnVpbGRCb2FyZCgpO1xuICAgICAgICB0aGlzLnJlc3RhcnQoKTtcbiAgICAgICAgLy8gdGhpcy5pbnRyb1R3ZWVuKCk7XG4gICAgICAgIHRoaXMuc2V0VXAoKTtcbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCl7dGhhdC5zaW1vblNlcXVlbmNlKCk7IHRoYXQuaW50cm8gPSBmYWxzZTt9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBzdG9wSGludCgpIHtcbiAgICAgICAgaWYodGhpcy5oaW50aW5nVGlsZSAmJiB0aGlzLmhpbnRpbmdUaWxlLmlzUnVubmluZykge1xuICAgICAgICAgICAgdGhpcy5oaW50aW5nVGlsZS5zdG9wKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaW50TmV4dEJ1dHRvbigpIHtcbiAgICAgICAgaWYoIXRoaXMuaGludGluZ1RpbGUgfHwgIXRoaXMuaGludGluZ1RpbGUuaXNSdW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmhpbnRpbmdUaWxlID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLnNpbW9uLmdldEF0KHRoaXMuc2VxdWVuY2VMaXN0W3RoaXMudXNlckNvdW50XSkpLnRvKCB7IGFscGhhOiAuNzUgfSwgNTAwLCBQaGFzZXIuRWFzaW5nLkxpbmVhci5Ob25lLCB0cnVlLCAwLCA0LCB0cnVlKTtcbiAgICAgICAgICAgIHZhciBmaW5hbCA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcy5zaW1vbi5nZXRBdCh0aGlzLnNlcXVlbmNlTGlzdFt0aGlzLnVzZXJDb3VudF0pKS50byggeyBhbHBoYTogLjI1IH0sIDUwMCwgUGhhc2VyLkVhc2luZy5MaW5lYXIuTm9uZSwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmhpbnRpbmdUaWxlLmNoYWluKGZpbmFsKTtcbiAgICAgICAgICAgIHRoaXMuaGludGluZ1RpbGUucmVwZWF0KC0xKTtcbiAgICAgICAgICAgIHRoaXMuaGludGluZ1RpbGUuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGludHJvVHdlZW4oKSB7XG4gICAgLy8gICAgIHRoaXMuaW50cm8gPSB0cnVlO1xuICAgIC8vICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGlsZUNvdW50OyBpKyspIHtcbiAgICAvLyAgICAgICAgIHZhciBmbGFzaGluZyA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcy5zaW1vbi5nZXRBdChpKSkudG8oIHsgYWxwaGE6IDEgfSwgNTAwLCBQaGFzZXIuRWFzaW5nLkxpbmVhci5Ob25lLCB0cnVlLCAwLCA0LCB0cnVlKTtcbiAgICAvLyAgICAgICAgIHZhciBmaW5hbCA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcy5zaW1vbi5nZXRBdChpKSkudG8oIHsgYWxwaGE6IC4yNSB9LCA1MDAsIFBoYXNlci5FYXNpbmcuTGluZWFyLk5vbmUsIHRydWUpO1xuICAgIC8vICAgICAgICAgZmxhc2hpbmcuY2hhaW4oZmluYWwpO1xuICAgIC8vICAgICAgICAgZmxhc2hpbmcuc3RhcnQoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIGdldFJhbmRvbUJsb2NrKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogU1BSSVRFX0JMT0NLX0NPVU5UKTtcbiAgICB9XG5cbiAgICBnZXRHcmlkU2V0dGluZygpIHtcbiAgICAgICAgY29uc3Qgcm93SXRlbUNvdW50ID0gdGhpcy50aWxlQ291bnQgLyAyO1xuICAgICAgICBjb25zdCBnYW1lV2lkdGggPSB0aGlzLmdhbWUud2lkdGg7XG4gICAgICAgIGNvbnN0IGJvYXJkV2lkdGggPSAocm93SXRlbUNvdW50ICogVElMRV9XSURUSCkgKyAocm93SXRlbUNvdW50ICogVElMRV9QQURESU5HKTtcbiAgICAgICAgY29uc3QgYm9hcmRQYWRkaW5nID0gKGdhbWVXaWR0aCAtIGJvYXJkV2lkdGgpIC8gMjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJvYXJkUGFkZGluZ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRCb2FyZCAoKSB7XG4gICAgICAgIHRoaXMuc2ltb24gPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICAgIHZhciBpdGVtOlBoYXNlci5TcHJpdGU7XG4gICAgICAgIGNvbnN0IHJvd0xlbmd0aCA9IHRoaXMudGlsZUNvdW50IC8gMjtcbiAgICAgICAgY29uc3QgZ3JpZFNldHRpbmdzID0gdGhpcy5nZXRHcmlkU2V0dGluZygpO1xuXG4gICAgICAgIHRoaXMuYnVpbGRSb3coeyByb3dMZW5ndGgsIGdyaWRTZXR0aW5ncywgcm93TnVtYmVyOiAxIH0pO1xuICAgICAgICB0aGlzLmJ1aWxkUm93KHsgcm93TGVuZ3RoLCBncmlkU2V0dGluZ3MsIHJvd051bWJlcjogMiB9KTtcbiAgICB9XG5cbiAgICBidWlsZFJvdyh7cm93TGVuZ3RoLCBncmlkU2V0dGluZ3MsIHJvd051bWJlcn0pIHtcbiAgICAgICAgdmFyIGl0ZW06UGhhc2VyLlNwcml0ZTtcbiAgICAgICAgbGV0IHkgPSAxNTAgKiByb3dOdW1iZXI7XG4gICAgICAgIGlmKHJvd051bWJlciA+IDEpIHtcbiAgICAgICAgICAgIHkgKz0gVElMRV9QQURESU5HXG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dMZW5ndGg7IGkrKylcbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuc2ltb24uY3JlYXRlKGdyaWRTZXR0aW5ncy5ib2FyZFBhZGRpbmcgKyAoVElMRV9XSURUSCArIFRJTEVfUEFERElORykgKiBpLCB5LCAnaXRlbScsIHRoaXMuZ2V0UmFuZG9tQmxvY2soKSk7XG4gICAgICAgICAgICAvLyBFbmFibGUgaW5wdXQuXG4gICAgICAgICAgICBpdGVtLmlucHV0RW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBpdGVtLmlucHV0LnN0YXJ0KDAsIHRydWUpO1xuICAgICAgICAgICAgaXRlbS5ldmVudHMub25JbnB1dERvd24uYWRkKHRoaXMuc2VsZWN0LCB0aGlzKTtcbiAgICAgICAgICAgIGl0ZW0uZXZlbnRzLm9uSW5wdXRVcC5hZGQodGhpcy5yZWxlYXNlLCB0aGlzKTtcbiAgICAgICAgICAgIGl0ZW0uZXZlbnRzLm9uSW5wdXRPdXQuYWRkKHRoaXMubW92ZU9mZiwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnNpbW9uLmdldEF0KGkgKiByb3dOdW1iZXIpLmFscGhhID0gLjI1O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLnNpbW9uU2V6KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLnRpbWUubm93IC0gdGhpcy50aW1lQ2hlY2sgPiA3MDAgLSB0aGlzLk4gKiA0MCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2ltb24uZ2V0QXQodGhpcy5saXRTcXVhcmUpLmFscGhhID0gLjI1O1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wYXVzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGF0LmN1cnJlbnRDb3VudCA8IHRoYXQuTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nYW1lLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaW1vblNlcXVlbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNpbW9uU2V6ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdhbWUucGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCA0MDAgLSB0aGF0Lk4gKiAyMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLnRpbWUubm93IC0gdGhpcy50aW1lTGFzdEFjdGlvbiA+IDEwMDAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lTGFzdEFjdGlvbiA9IHRoaXMuZ2FtZS50aW1lLm5vdztcbiAgICAgICAgICAgICAgICB0aGlzLmhpbnROZXh0QnV0dG9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwbGF5ZXJTZXF1ZW5jZShzZWxlY3RlZCkge1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGNvcnJlY3RTcXVhcmUgPSB0aGlzLnNlcXVlbmNlTGlzdFt0aGlzLnVzZXJDb3VudF07XG4gICAgICAgIHRoaXMudXNlckNvdW50Kys7XG4gICAgICAgIGNvbnN0IHRoaXNTcXVhcmUgPSB0aGlzLnNpbW9uLmdldEluZGV4KHNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy50aW1lTGFzdEFjdGlvbiA9IHRoaXMuZ2FtZS50aW1lLm5vdztcblxuICAgICAgICBpZiAodGhpc1NxdWFyZSA9PSBjb3JyZWN0U3F1YXJlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyQ291bnQgPT0gdGhpcy5OKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLk4gPT0gdGhpcy5zZXF1ZW5jZUNvdW50KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5uZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhhdC5nYW1lLnN0YXRlLnN0YXJ0KCdDbGFzc3Jvb20nLCB0cnVlLCBmYWxzZSk7fSwgMzAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Q291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLk4rKztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaW1vblNleiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cnlBZ2FpbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnVzZXJDb3VudCA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDb3VudCA9IDA7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhhdC5zaW1vblNlcXVlbmNlKCk7fSwgMzAwMCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNpbW9uU2VxdWVuY2UgKCkge1xuICAgICAgICB0aGlzLnNpbW9uU2V6ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5saXRTcXVhcmUgPSB0aGlzLnNlcXVlbmNlTGlzdFt0aGlzLmN1cnJlbnRDb3VudF07XG4gICAgICAgIHRoaXMuc2ltb24uZ2V0QXQodGhpcy5saXRTcXVhcmUpLmFscGhhID0gMTtcbiAgICAgICAgdGhpcy50aW1lQ2hlY2sgPSB0aGlzLmdhbWUudGltZS5ub3c7XG4gICAgICAgIGlmKCF0aGlzLnRyeUFnYWluKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJ5QWdhaW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZXRVcCgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNlcXVlbmNlQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdGhpc1NxdWFyZSA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMCx0aGlzLnRpbGVDb3VudCAtIDEpO1xuICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZUxpc3QucHVzaCh0aGlzU3F1YXJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGltZUxhc3RBY3Rpb24gPSB0aGlzLmdhbWUudGltZS5ub3c7XG4gICAgfVxuXG4gICAgc2VsZWN0KGl0ZW0sIHBvaW50ZXIpIHtcbiAgICAgICAgdGhpcy5zdG9wSGludCgpO1xuICAgICAgICBpZiAoIXRoaXMuc2ltb25TZXogJiYgIXRoaXMuaW50cm8gJiYgIXRoaXMudHJ5QWdhaW4gJiYgIXRoaXMud2lubmVyKSB7XG4gICAgICAgICAgICBpdGVtLmFscGhhID0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbGVhc2UoaXRlbSwgcG9pbnRlcikge1xuICAgICAgICBpZiAoIXRoaXMuc2ltb25TZXogJiYgIXRoaXMuaW50cm8gJiYgIXRoaXMudHJ5QWdhaW4gJiYgIXRoaXMud2lubmVyKSB7XG4gICAgICAgICAgICBpdGVtLmFscGhhID0gLjI1O1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJTZXF1ZW5jZShpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVPZmYoaXRlbSwgcG9pbnRlcikge1xuICAgICAgICBpZiAoIXRoaXMuc2ltb25TZXogJiYgIXRoaXMuaW50cm8gJiYgIXRoaXMudHJ5QWdhaW4gJiYgIXRoaXMud2lubmVyKSB7XG4gICAgICAgICAgICBpdGVtLmFscGhhID0gLjI1O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdGFydCgpIHtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLnNpbW9uU2V6ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuTiA9IDE7XG4gICAgICAgIHRoaXMudXNlckNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50Q291bnQgPSAwO1xuICAgICAgICB0aGlzLnNlcXVlbmNlTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLndpbm5lciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyeUFnYWluID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW50cm8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNpbW9uU2V6KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmRlYnVnLnRleHQoJ0dsaXRjaCEnLCAzNjAsIDk2LCAncmdiKDI1NSwwLDApJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuZGVidWcudGV4dCgnRml4IScsIDM2MCwgOTYsICdyZ2IoMCwyNTUsMCknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KCdHZXQgUmVhZHknLCAzNjAsIDk2LCAncmdiKDAsMCwyNTUpJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53aW5uZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KCdZb3UgV2luIScsIDM2MCwgMzIsICdyZ2IoMCwwLDI1NSknKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnRyeUFnYWluKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuZGVidWcudGV4dCgnVHJ5IGFnYWluIScsIDM2MCwgMzIsICdyZ2IoMCwwLDI1NSknKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vc3JjL0JvYXJkLnRzIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQnO1xuaW1wb3J0IENsYXNzcm9vbSBmcm9tICcuL0NsYXNzcm9vbSc7XG5jbGFzcyBHb1NpbW9uXG57XG5cdGdhbWU6UGhhc2VyLkdhbWU7XG4gICAgYm9hcmQ6Qm9hcmQ7XG5cdFxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoIDgwMCwgNjAwLCBQaGFzZXIuQVVUTywgJ2NvbnRlbnQnLCB7XG4gICAgICAgICAgICBwcmVsb2FkOiB0aGlzLnByZWxvYWQsXG4gICAgICAgICAgICBjcmVhdGU6IHRoaXMuY3JlYXRlLFxuICAgICAgICAgICAgdXBkYXRlOiB0aGlzLnVwZGF0ZSxcbiAgICAgICAgICAgIHJlbmRlcjogdGhpcy5yZW5kZXJcbiAgICAgICAgfSk7ICAgICAgICBcblx0fVxuXHRcblx0cHJlbG9hZCgpIHtcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2l0ZW0nLCAnYXNzZXRzL251bWJlci1idXR0b25zLnBuZycsIDE2MCwgMTYwKTtcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2JnJywgJ2Fzc2V0cy9za3k0LnBuZycpO1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuICAgICAgICB0aGlzLmdhbWUuYWRkLmltYWdlKDAsIDAsICdiZycpO1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKCdDbGFzc3Jvb20nLCBDbGFzc3Jvb20pO1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKCdCb2FyZCcsIEJvYXJkKTtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdDbGFzc3Jvb20nLCB0cnVlLCBmYWxzZSk7XG5cdH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICB9ICAgIFxuXG4gICAgcmVuZGVyKCkge1xuICAgIH0gXG59XG5cbi8vIHdoZW4gdGhlIHBhZ2UgaGFzIGZpbmlzaGVkIGxvYWRpbmcsIGNyZWF0ZSBvdXIgZ2FtZVxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcblx0dmFyIGdhbWUgPSBuZXcgR29TaW1vbigpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vc291cmNlLW1hcC1sb2FkZXIhLi9zcmMvR2FtZS50cyIsImV4cG9ydCBjb25zdCBUSUxFX1dJRFRIID0gMTUwO1xuZXhwb3J0IGNvbnN0IFRJTEVfSEVJR0hUID0gMTUwO1xuZXhwb3J0IGNvbnN0IFRJTEVfUEFERElORyA9IDIwO1xuLy8gZXhwb3J0IGNvbnN0IFNQUklURV9CTE9DS19YID0gMTUwICsgMTY4O1xuLy8gZXhwb3J0IGNvbnN0IFNQUklURV9CTE9DS19UT1BfWSA9IDE1MDtcbmV4cG9ydCBjb25zdCBTUFJJVEVfQkxPQ0tfQk9UVE9NX1kgPSAzMTg7XG5leHBvcnQgY29uc3QgU1BSSVRFX0JMT0NLX0NPVU5UID0gNjtcbmV4cG9ydCBjb25zdCBTVE9QX1BBRERJTkcgPSAxNTA7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9jb25zdGFudHMudHMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc1Jvb20gZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuICAgIG1lbnU6UGhhc2VyLkdyb3VwO1xuICAgIGdhbWU6UGhhc2VyLkdhbWU7XG4gICAgY3JlYXRlKCkge1xuICAgICAgICB0aGlzLmdhbWUuYWRkLmltYWdlKDAsIDAsICdiZycpO1xuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICAgIGNvbnN0IG1lbnVJdGVtID0gdGhpcy5tZW51LmNyZWF0ZSgxMDAsIDEwMCwgJ2l0ZW0nLCAxKTtcbiAgICAgICAgY29uc3QgbWVudUl0ZW0yID0gdGhpcy5tZW51LmNyZWF0ZSgyNTAsIDM1MCwgJ2l0ZW0nLCAzKTtcbiAgICAgICAgY29uc3QgbWVudUl0ZW0zID0gdGhpcy5tZW51LmNyZWF0ZSg1NTAsIDE1MCwgJ2l0ZW0nLCA1KTtcblxuICAgICAgICBtZW51SXRlbS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBtZW51SXRlbS5pbnB1dC5zdGFydCgwLCB0cnVlKTtcbiAgICAgICAgbWVudUl0ZW0uZXZlbnRzLm9uSW5wdXRVcC5hZGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdCb2FyZCcsIHRydWUsIGZhbHNlLCB7dGlsZUNvdW50OiAyLCBzZXF1ZW5jZUNvdW50OiA0fSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBtZW51SXRlbTIuaW5wdXRFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgbWVudUl0ZW0yLmlucHV0LnN0YXJ0KDAsIHRydWUpO1xuICAgICAgICBtZW51SXRlbTIuZXZlbnRzLm9uSW5wdXRVcC5hZGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdCb2FyZCcsIHRydWUsIGZhbHNlLCB7dGlsZUNvdW50OiA0LCBzZXF1ZW5jZUNvdW50OiA0fSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBtZW51SXRlbTMuaW5wdXRFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgbWVudUl0ZW0zLmlucHV0LnN0YXJ0KDAsIHRydWUpO1xuICAgICAgICBtZW51SXRlbTMuZXZlbnRzLm9uSW5wdXRVcC5hZGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdCb2FyZCcsIHRydWUsIGZhbHNlLCB7dGlsZUNvdW50OiA2LCBzZXF1ZW5jZUNvdW50OiA0fSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vc3JjL0NsYXNzcm9vbS50cyJdLCJzb3VyY2VSb290IjoiIn0=