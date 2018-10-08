"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockType_1 = require("./BlockType");
const ArenaTools_1 = require("./ArenaTools");
const Block_1 = require("./Block");
const Coordinate_1 = require("./Coordinate");
class Arena {
    constructor(x = 15, y = 15) {
        this.arenaTable = [];
        this.buildArenaTable(x, y);
    }
    /**
    * Creates the arena. Add concrete walls around it. Adds pillars to every
    * second row and column. Finally adds tiles at random (so that players'
    * starting points and block next to them is left empty).
    */
    buildArenaTable(columnAmount, rowAmount) {
        // this.arenaTable: Block[][] = [];
        // Add single concrete blocks (pillars) and set all other blocks to free
        for (var row = 0; row < rowAmount; row++) {
            this.arenaTable[row] = [];
            for (var column = 0; column < columnAmount; column++) {
                // Add concrete pillars to field
                if (row % 2 === 0 && column % 2 === 0) {
                    this.arenaTable[row][column] = new Block_1.Block(new Coordinate_1.Coordinate(column, row), BlockType_1.BlockType.CONCRETE);
                }
                else {
                    // If concrete block not added set the block to free
                    this.arenaTable[row][column] = new Block_1.Block(new Coordinate_1.Coordinate(column, row), BlockType_1.BlockType.FREE);
                }
            }
        }
        // Add concrete top, bottom and side walls
        ArenaTools_1.ArenaTools.fillRowWithSymbol(this.arenaTable, 0, BlockType_1.BlockType.CONCRETE);
        ArenaTools_1.ArenaTools.fillRowWithSymbol(this.arenaTable, this.arenaTable.length - 1, BlockType_1.BlockType.CONCRETE);
        ArenaTools_1.ArenaTools.fillColumnWithSymbol(this.arenaTable, 0, BlockType_1.BlockType.CONCRETE);
        ArenaTools_1.ArenaTools.fillColumnWithSymbol(this.arenaTable, this.arenaTable[0].length - 1, BlockType_1.BlockType.CONCRETE);
        // Add random tiles
        ArenaTools_1.ArenaTools.addRandomTiles(this.arenaTable);
    }
    print() {
        for (var row = 0; row < this.arenaTable.length; row++) {
            var rowText = '';
            for (var column = 0; column < this.arenaTable[row].length; column++) {
                var columnText = '';
                switch (this.arenaTable[row][column].getBlockType()) {
                    case BlockType_1.BlockType.FREE:
                        columnText = '  ';
                        break;
                    case BlockType_1.BlockType.TILE:
                        columnText = '##';
                        break;
                    case BlockType_1.BlockType.CONCRETE:
                        columnText = '::';
                        break;
                    default:
                        columnText = '??';
                }
                rowText = rowText + columnText;
            }
            console.log(rowText);
        }
    }
}
exports.Arena = Arena;
//# sourceMappingURL=Arena.js.map