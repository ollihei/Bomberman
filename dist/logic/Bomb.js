"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bomb {
    constructor() {
        this.strength = 2;
        this.timeToLive = 5;
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