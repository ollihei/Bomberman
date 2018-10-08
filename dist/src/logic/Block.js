"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockType_1 = require("./BlockType");
class Block {
    constructor(coordinate, type) {
        this.players = [];
        this.flamesOn = false;
        this.coordinate = coordinate;
        this.type = type;
    }
    getPlayers() {
        return this.players;
    }
    /**
    * Returns the first not exploded player. If there are no players or there
    * are only exploded players then null is returned.
    */
    getFirstNotExplodedPlayer() {
        const playersNotExploded = this.players
            .filter((player) => !player.isExploded());
        return playersNotExploded.length > 0 ? playersNotExploded[0] : null;
    }
    addPlayer(player) {
        this.players.push(player);
    }
    removePlayer(player) {
        this.players = this.players
            .filter((playerInArray) => playerInArray !== player);
    }
    setFlamesOn(flamesOn) {
        this.flamesOn = flamesOn;
    }
    isFlamesOn() {
        return this.flamesOn;
    }
    isConcrete() {
        return this.type === BlockType_1.BlockType.CONCRETE;
    }
    setToBeMadeFree() {
        this.makeFree = true;
    }
    isToBeMadeFree() {
        return this.makeFree;
    }
    isTile() {
        return this.type === BlockType_1.BlockType.TILE;
    }
    setFree() {
        this.type = BlockType_1.BlockType.FREE;
    }
    isFree() {
        return this.type === BlockType_1.BlockType.FREE;
    }
    setBomb(bomb) {
        this.bomb = bomb;
    }
    removeBomb() {
        this.bomb = null;
    }
    isBomb() {
        return !!this.bomb;
    }
    getBomb() {
        return this.bomb;
    }
    getCoordinate() {
        return this.coordinate;
    }
    setBlockType(type) {
        this.type = type;
    }
    getBlockType() {
        return this.type;
    }
}
exports.Block = Block;
//# sourceMappingURL=Block.js.map