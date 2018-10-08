"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getAsString() {
        return this.getX() + '-' + this.getY();
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}
exports.Coordinate = Coordinate;
//# sourceMappingURL=Coordinate.js.map