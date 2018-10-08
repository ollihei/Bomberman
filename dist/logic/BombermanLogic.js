"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Arena_1 = require("./Arena");
class BombermanLogic {
    constructor() {
        this.players = [];
        this.players = [];
        this.arena = new Arena_1.Arena();
        this.roundNumber = 1;
    }
    addPlayer(player) {
        this.players.push(player);
    }
    runRound() {
        console.log('Round ' + this.roundNumber);
        this.arena.print();
        this.roundNumber++;
        console.log('');
    }
}
exports.BombermanLogic = BombermanLogic;
//# sourceMappingURL=BombermanLogic.js.map