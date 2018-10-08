"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Arena_1 = require("./Arena");
class BombermanLogic {
    constructor() {
        this.players = [];
        this.bombs = [];
        this.players = [];
        this.arena = new Arena_1.Arena();
        this.roundNumber = 1;
    }
    addPlayer(player) {
        this.players.push(player);
        this.arena.addPlayer(player);
    }
    roundZero() {
        console.log('Round 0');
        this.arena.print();
        console.log('');
    }
    runRound() {
        console.log('Round ' + this.roundNumber);
        this.bombs.forEach((bomb) => {
            bomb.getPlayer().decreaseBombAmount();
        });
        const playerMoves = this.players.map((player) => {
            return {
                player: player,
                move: player.getMove(this.arena)
            };
        });
        playerMoves.forEach((playerMovePart) => {
            this.arena.movePlayer(playerMovePart.player, playerMovePart.move.direction);
        });
        playerMoves.forEach((playerMovePart) => {
            if (playerMovePart.move.leaveBomb) {
                const bomb = this.arena.leaveBomb(playerMovePart.player);
                if (bomb) {
                    this.bombs.push(bomb);
                }
            }
        });
        const explodedPlayers = new Set();
        this.bombs.forEach((bomb) => {
            bomb.decreaseTimeToLive();
            if (bomb.isTimeToExplode()) {
                this.arena.explodeBomb(bomb)
                    .forEach((player) => explodedPlayers.add(player));
                bomb.getPlayer().increaseBombAmount();
            }
        });
        this.arena.bombsExplodedForRound();
        explodedPlayers.forEach((player) => {
            player.setExploded();
        });
        // Remove exploded bombs
        this.bombs = this.bombs.filter((bomb) => {
            return !bomb.isExploded();
        });
        this.arena.print();
        this.arena.clearAllFlames();
        this.roundNumber++;
        const notExplodedPlayers = this.players
            .filter((player) => !player.isExploded());
        if (notExplodedPlayers.length === 0) {
            console.log('TIE');
        }
        if (notExplodedPlayers.length === 1) {
            console.log(`WINNER: ${notExplodedPlayers[0].getPlayerNumber()}`);
        }
        console.log('');
    }
}
exports.BombermanLogic = BombermanLogic;
//# sourceMappingURL=BombermanLogic.js.map