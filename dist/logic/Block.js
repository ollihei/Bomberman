"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockType_1 = require("./BlockType");
class Block {
    constructor(coordinate, type) {
        this.coordinate = coordinate;
        this.type = type;
    }
    isConcrete() {
        return this.type === BlockType_1.BlockType.CONCRETE;
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