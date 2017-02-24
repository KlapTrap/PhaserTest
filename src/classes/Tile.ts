export default class Tile extends Phaser.Sprite {
    blinkTween:Phaser.Tween;

    blinkStart() {
        this.blinkTween = this.game.add.tween(this).to( { alpha: .1 }, 500, Phaser.Easing.Linear.None, true, 0, 4, true);
        var final = this.game.add.tween(this).to( { alpha: .25 }, 500, Phaser.Easing.Linear.None, true);
        this.blinkTween.chain(final);
        this.blinkTween.repeat(-1);
        this.blinkTween.start();
        return this.blinkTween;
    }

    blinkStop() {
        this.blinkTween.stop();
    }

    fade() {
        this.alpha = .5;
    }

    shine() {
        this.alpha = 1;
    }

}