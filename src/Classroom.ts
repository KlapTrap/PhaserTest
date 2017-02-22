export default class ClassRoom extends Phaser.State {
    menu:Phaser.Group;
    game:Phaser.Game;
    create() {
        this.game.add.image(0, 0, 'bg');
        this.menu = this.game.add.group();
        const menuItem = this.menu.create(100, 100, 'item', 1);
        const menuItem2 = this.menu.create(250, 350, 'item', 3);
        const menuItem3 = this.menu.create(550, 150, 'item', 5);

        menuItem.inputEnabled = true;
        menuItem.input.start(0, true);
        menuItem.events.onInputUp.add(function () {
            this.game.state.start('Board', true, false, {tileCount: 2, sequenceCount: 4});
        }, this);
        menuItem2.inputEnabled = true;
        menuItem2.input.start(0, true);
        menuItem2.events.onInputUp.add(function () {
            this.game.state.start('Board', true, false, {tileCount: 4, sequenceCount: 4});
        }, this);
        menuItem3.inputEnabled = true;
        menuItem3.input.start(0, true);
        menuItem3.events.onInputUp.add(function () {
            this.game.state.start('Board', true, false, {tileCount: 6, sequenceCount: 4});
        }, this);
    }
}