"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bomb {
    constructor() {
        this.strength = 2;
        this.timeToLive = 5;
    }
    isExploded() {
        return this.exploded;
    }
    isExplodeInProgress() {
        return this.explodeInProgress;
    }
    setExplodeInProgress() {
        this.explodeInProgress = true;
    }
    setExploded() {
        this.exploded = true;
    }
    setPlayer(player) {
        this.player = player;
    }
    getPlayer() {
        return this.player;
    }
    setCoordinate(coordinate) {
        this.coordinate = coordinate;
    }
    getCoordinate() {
        return this.coordinate;
    }
    getStrength() {
        return this.strength;
    }
    decreaseTimeToLive() {
        this.timeToLive--;
    }
    isTimeToExplode() {
        return this.timeToLive < 1;
    }
}
exports.Bomb = Bomb;
//# sourceMappingURL=Bomb.js.map