"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockType_1 = require("./BlockType");
class ArenaTools {
}
ArenaTools.fillRowWithSymbol = function (arenaTable, rowId, symbol) {
    for (var i = 0; i < arenaTable[rowId].length; i++) {
        arenaTable[rowId][i].setBlockType(symbol);
    }
};
ArenaTools.fillColumnWithSymbol = function (arenaTable, columnId, symbol) {
    for (var i = 0; i < arenaTable.length; i++) {
        arenaTable[i][columnId].setBlockType(symbol);
    }
};
/**
 * Adds tiles to arena randomly. Leave players' starting points and the tiles next to them empty.
 */
ArenaTools.addRandomTiles = function (arenaTable) {
    for (var row = 0; row < arenaTable.length; row++) {
        for (var column = 0; column < arenaTable[row].length; column++) {
            if (arenaTable[row][column].isConcrete()) {
                continue;
            }
            if ((row === 1 && (column === 1 || column === 2 || column === arenaTable[0].length - 3 || column === arenaTable[0].length - 2)) ||
                (row === 2 && (column === 1 || column === arenaTable[0].length - 2)) ||
                (row === arenaTable.length - 3 && (column === 1 || column === arenaTable[0].length - 2)) ||
                (row === arenaTable.length - 2 && (column === 1 || column === 2 || column === arenaTable[0].length - 3 || column === arenaTable[0].length - 2))) {
                continue;
            }
            if (Math.random() < 0.75)
                arenaTable[row][column].setBlockType(BlockType_1.BlockType.TILE);
        }
    }
};
exports.ArenaTools = ArenaTools;
//# sourceMappingURL=ArenaTools.js.map