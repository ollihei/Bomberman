"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(playerNumber) {
        this.exploded = false;
        this.bombAmount = 2;
        this.playerNumber = playerNumber;
    }
    setUi(ui) {
        this.ui = ui;
    }
    ;
    setExploded() {
        this.exploded = true;
    }
    isExploded() {
        return this.exploded;
    }
    setLocation(coordinate) {
        this.coordinate = coordinate;
    }
    getLocation() {
        return this.coordinate;
    }
    decreaseBombAmount() {
        this.bombAmount--;
    }
    increaseBombAmount() {
        this.bombAmount++;
    }
    isBombsLeft() {
        return this.bombAmount > 0;
    }
    getPlayerNumber() {
        return this.playerNumber;
    }
    getMove(arena) {
        console.log('Player ' + this.getPlayerNumber() + ' move');
        //return { direction: 1, leaveBomb: true }
        return this.ui.makeMove(arena, this.coordinate);
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map