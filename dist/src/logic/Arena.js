"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockType_1 = require("./BlockType");
const Bomb_1 = require("./Bomb");
const ArenaTools_1 = require("./ArenaTools");
const Block_1 = require("./Block");
const Coordinate_1 = require("./Coordinate");
const UiArena_1 = require("./UiArena");
class Arena {
    constructor(x = 15, y = 15, tileProbability = 0.75) {
        this.x = x;
        this.y = y;
        this.arenaTable = [];
        // Bombs th
        this.explodedBlocks = [];
        this.buildArenaTable({ columnAmount: x, rowAmount: y, tileProbability: tileProbability });
        this.uiArena = new UiArena_1.UiArena(this);
    }
    /**
    * Adds the given player to arena. Determinates the starting coordinate.
    */
    addPlayer(player) {
        const coordinate = this.getStartingCoordinateForPlayer(player);
        this.getBlock(coordinate).addPlayer(player);
        player.setLocation(coordinate);
    }
    /**
    * Return the starting coordinate for given player.
    */
    getStartingCoordinateForPlayer(player) {
        if (player.getPlayerNumber() === 1) {
            return new Coordinate_1.Coordinate(1, 1);
        }
        else if (player.getPlayerNumber() === 2) {
            return new Coordinate_1.Coordinate(this.x - 2, 1);
        }
        else if (player.getPlayerNumber() === 3) {
            return new Coordinate_1.Coordinate(this.x - 2, this.y - 2);
        }
        else if (player.getPlayerNumber() === 4) {
            return new Coordinate_1.Coordinate(1, this.y - 2);
        }
    }
    /**
    * Creates the arena. Add concrete walls around it. Adds pillars to every
    * second row and column. Finally adds tiles at random (so that players'
    * starting points and block next to them is left empty).
    */
    buildArenaTable(properties) {
        // Add single concrete blocks (pillars) and set all other blocks to free
        for (var row = 0; row < properties.rowAmount; row++) {
            this.arenaTable[row] = [];
            for (var column = 0; column < properties.columnAmount; column++) {
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
        ArenaTools_1.ArenaTools.addRandomTiles(this.arenaTable, properties.tileProbability);
    }
    getBlock(coordinate) {
        return this.arenaTable[coordinate.getX()][coordinate.getY()];
    }
    isLegalMove(coordinate, move) {
        const coordinateNew = this.getCoordinateAfterMove(coordinate, move);
        const block = this.getBlock(coordinateNew);
        return block.isFree();
    }
    isLegalToLeaveBomb(coordinate) {
        const block = this.getBlock(coordinate);
        return block.isFree() && !block.isBomb();
    }
    /**
    * Explodes the given bomb and returns the players that are in flames.
    */
    explodeBomb(bomb) {
        if (bomb.isExplodeInProgress() &&
            bomb.isExploded()) {
            return;
        }
        bomb.setExplodeInProgress();
        const block = this.getBlock(bomb.getCoordinate());
        const playersInFlames = [];
        playersInFlames.push(...this.handleFlameInBlock(block));
        playersInFlames.push(...this.makeFlames(bomb.getCoordinate(), 1, bomb.getStrength() - 1));
        playersInFlames.push(...this.makeFlames(bomb.getCoordinate(), 2, bomb.getStrength() - 1));
        playersInFlames.push(...this.makeFlames(bomb.getCoordinate(), 3, bomb.getStrength() - 1));
        playersInFlames.push(...this.makeFlames(bomb.getCoordinate(), 4, bomb.getStrength() - 1));
        bomb.setExploded();
        block.removeBomb();
        return playersInFlames;
    }
    getUiArena() {
        return this.uiArena;
    }
    /**
    * Handles flame in block. Sets flames on. Adds the block to exploded blocks.
    * Explodes any bomb in the given block.
    */
    handleFlameInBlock(block) {
        const playersInFlames = [];
        block.setFlamesOn(true);
        this.explodedBlocks.push(block);
        if (block.isBomb()) {
            const bomb = block.getBomb();
            // If bomb has alreade exploded or the explode is in progress
            // => ignore
            if (!bomb.isExploded() && !bomb.isExplodeInProgress())
                playersInFlames.push(...this.explodeBomb(bomb));
        }
        playersInFlames.push(...block.getPlayers());
        return playersInFlames;
    }
    /**
    * Continues the flames to given direction from given coordinate. Returns the
    * players that are in flames.
    */
    makeFlames(coordinate, direction, strength) {
        const coordinateNew = this.getCoordinateAfterMove(coordinate, direction);
        const block = this.getBlock(coordinateNew);
        if (block.isConcrete())
            return [];
        if (block.isTile()) {
            block.setFlamesOn(true);
            this.explodedBlocks.push(block);
            block.setToBeMadeFree();
            return [];
        }
        //block.setFlamesOn(true);
        //this.explodedBlocks.push(block);
        const playersInFlames = [];
        playersInFlames.push(...this.handleFlameInBlock(block));
        playersInFlames.push(...this.makeFlames(coordinateNew, direction, strength - 1));
        return playersInFlames;
    }
    /**
    * Clears all flames from arena.
    */
    clearAllFlames() {
        this.explodedBlocks.forEach((block) => {
            block.setFlamesOn(false);
        });
        this.explodedBlocks = [];
    }
    /**
    * Moves the player if the move is legal.
    */
    movePlayer(player, move) {
        if (this.isLegalMove(player.getLocation(), move)) {
            const blockOld = this.getBlock(player.getLocation());
            const coordinateNew = this.getCoordinateAfterMove(player.getLocation(), move);
            const blockNew = this.getBlock(coordinateNew);
            player.setLocation(coordinateNew);
            blockOld.removePlayer(player);
            blockNew.addPlayer(player);
        }
    }
    getCoordinateAfterMove(coordinate, move) {
        let changeX = 0;
        let changeY = 0;
        if (move === 1)
            changeY--; // Up
        if (move === 2)
            changeX++; // Right
        if (move === 3)
            changeY++; // Down
        if (move === 4)
            changeX--; // Left
        return new Coordinate_1.Coordinate(coordinate.getX() + changeX, coordinate.getY() + changeY);
    }
    /**
    * Leaves a bomb if it's possible to leave a bomb to player's location.
    */
    leaveBomb(player) {
        if (this.isLegalToLeaveBomb(player.getLocation())
            && player.isBombsLeft()) {
            const block = this.getBlock(player.getLocation());
            const bomb = new Bomb_1.Bomb();
            bomb.setPlayer(player);
            bomb.setCoordinate(player.getLocation());
            player.decreaseBombAmount();
            block.setBomb(bomb);
            return bomb;
        }
        return null;
    }
    /**
    * This is called when all the bombs that are about to explode in this round have
    * exploded.
    */
    bombsExplodedForRound() {
        this.arenaTable.forEach((row) => {
            row.forEach((block) => {
                if (block.isToBeMadeFree()) {
                    block.setFree();
                }
            });
        });
    }
    /**
    * Prints the arena.
    */
    print() {
        for (var row = 0; row < this.arenaTable.length; row++) {
            var rowText = '';
            for (var column = 0; column < this.arenaTable[row].length; column++) {
                let columnText = '';
                const coordinate = new Coordinate_1.Coordinate(column, row);
                const block = this.getBlock(coordinate);
                const player = block.getFirstNotExplodedPlayer();
                if (block.isFlamesOn()) {
                    columnText = '¤¤';
                }
                else if (player) {
                    columnText = `${player.getPlayerNumber()}${block.isBomb() ? 'O' : player.getPlayerNumber()}`;
                }
                else if (block.isBomb()) {
                    columnText = 'OO';
                }
                else {
                    switch (block.getBlockType()) {
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
                }
                rowText += columnText;
            }
            console.log(rowText);
        }
    }
}
exports.Arena = Arena;
//# sourceMappingURL=Arena.js.map