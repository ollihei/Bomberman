"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BombermanLogic_1 = require("./BombermanLogic");
class BombermanGame {
    constructor() {
        this.players = [];
        this.bombermanLogic = new BombermanLogic_1.BombermanLogic();
    }
    addPlayer(player) {
        console.log('Added player ' + player.getPlayerNumber());
        this.players.push(player);
    }
    startGame() {
        console.log('Starting a new game');
        this.players.forEach((player) => this.bombermanLogic.addPlayer(player));
        for (var i = 0; i < 100; i++) {
            this.bombermanLogic.runRound();
        }
    }
}
exports.BombermanGame = BombermanGame;
//# sourceMappingURL=BombermanGame.js.map