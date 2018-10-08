import { BlockType } from './BlockType';
import { Bomb } from './Bomb';
import { ArenaTools } from './ArenaTools';
import { Block } from './Block';
import { Coordinate } from './Coordinate';
import { Player } from './Player';
import { UiArena } from './UiArena';

export class Arena {

  private arenaTable: Block[][] = [];
  // Bombs th
  private explodedBlocks: Block[] = [];
  //  private mapPlayers: Map<string, Player> = new Map<string, Player>();
  //  private mapPlayerLocations: Map<number, Coordinate> = new Map<number, Coordinate>();
  private uiArena;

  constructor(private x: number = 15, private y: number = 15, tileProbability: number = 0.75) {
    this.buildArenaTable({ columnAmount: x, rowAmount: y, tileProbability: tileProbability });
    this.uiArena = new UiArena(this);
  }

  /**
  * Adds the given player to arena. Determinates the starting coordinate.
  */
  addPlayer(player: Player): void {
    const coordinate: Coordinate = this.getStartingCoordinateForPlayer(player);
    this.getBlock(coordinate).addPlayer(player);
    player.setLocation(coordinate);
  }

  /**
  * Return the starting coordinate for given player.
  */
  getStartingCoordinateForPlayer(player: Player): Coordinate {
    if (player.getPlayerNumber() === 1) {
      return new Coordinate(1, 1);
    }
    else if (player.getPlayerNumber() === 2) {
      return new Coordinate(this.x - 2, 1);
    }
    else if (player.getPlayerNumber() === 3) {
      return new Coordinate(this.x - 2, this.y - 2);
    }
    else if (player.getPlayerNumber() === 4) {
      return new Coordinate(1, this.y - 2);
    }
  }

  /**
  * Creates the arena. Add concrete walls around it. Adds pillars to every
  * second row and column. Finally adds tiles at random (so that players'
  * starting points and block next to them is left empty).
  */
  buildArenaTable(properties: { columnAmount: number, rowAmount: number, tileProbability: number }): void {

    // Add single concrete blocks (pillars) and set all other blocks to free
    for (var row = 0; row < properties.rowAmount; row++) {
      this.arenaTable[row] = [];
      for (var column = 0; column < properties.columnAmount; column++) {
        // Add concrete pillars to field
        if (row % 2 === 0 && column % 2 === 0) {
          this.arenaTable[row][column] = new Block(new Coordinate(column, row), BlockType.CONCRETE);
        }
        else {
          // If concrete block not added set the block to free
          this.arenaTable[row][column] = new Block(new Coordinate(column, row), BlockType.FREE);
        }
      }
    }
    // Add concrete top, bottom and side walls
    ArenaTools.fillRowWithSymbol(this.arenaTable, 0, BlockType.CONCRETE)
    ArenaTools.fillRowWithSymbol(this.arenaTable, this.arenaTable.length - 1, BlockType.CONCRETE)
    ArenaTools.fillColumnWithSymbol(this.arenaTable, 0, BlockType.CONCRETE)
    ArenaTools.fillColumnWithSymbol(this.arenaTable, this.arenaTable[0].length - 1, BlockType.CONCRETE)

    // Add random tiles
    ArenaTools.addRandomTiles(this.arenaTable, properties.tileProbability);
  }

  private getBlock(coordinate: Coordinate): Block {
    return this.arenaTable[coordinate.getX()][coordinate.getY()];
  }

  private isLegalMove(coordinate: Coordinate, move: 0 | 1 | 2 | 3 | 4): boolean {
    const coordinateNew: Coordinate = this.getCoordinateAfterMove(coordinate, move);
    const block: Block = this.getBlock(coordinateNew);
    return block.isFree();
  }

  private isLegalToLeaveBomb(coordinate: Coordinate): boolean {
    const block: Block = this.getBlock(coordinate);
    return block.isFree() && !block.isBomb();
  }

  /**
  * Explodes the given bomb and returns the players that are in flames.
  */
  explodeBomb(bomb: Bomb): Player[] {
    if (bomb.isExplodeInProgress() &&
      bomb.isExploded()) {
      return;
    }
    bomb.setExplodeInProgress();
    const block: Block = this.getBlock(bomb.getCoordinate());
    const playersInFlames: Player[] = [];

    playersInFlames.push(...this.handleFlameInBlock(block));

    playersInFlames.push(...this.makeFlames(bomb.getCoordinate(), 1, bomb.getStrength() - 1));
    playersInFlames.push(...this.makeFlames(bomb.getCoordinate(), 2, bomb.getStrength() - 1));
    playersInFlames.push(...this.makeFlames(bomb.getCoordinate(), 3, bomb.getStrength() - 1));
    playersInFlames.push(...this.makeFlames(bomb.getCoordinate(), 4, bomb.getStrength() - 1));

    bomb.setExploded();
    block.removeBomb();
    return playersInFlames;
  }

  getUiArena(): UiArena {
    return this.uiArena;
  }

  /**
  * Handles flame in block. Sets flames on. Adds the block to exploded blocks.
  * Explodes any bomb in the given block.
  */
  handleFlameInBlock(block: Block): Player[] {
    const playersInFlames: Player[] = [];
    block.setFlamesOn(true);
    this.explodedBlocks.push(block);
    if (block.isBomb()) {
      const bomb: Bomb = block.getBomb();
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
  makeFlames(coordinate: Coordinate, direction: (0 | 1 | 2 | 3 | 4), strength: number): Player[] {
    const coordinateNew: Coordinate = this.getCoordinateAfterMove(coordinate, direction);
    const block: Block = this.getBlock(coordinateNew);
    if (block.isConcrete()) return [];
    if (block.isTile()) {
      block.setFlamesOn(true);
      this.explodedBlocks.push(block);
      block.setToBeMadeFree();
      return [];
    }

    //block.setFlamesOn(true);
    //this.explodedBlocks.push(block);
    const playersInFlames: Player[] = [];
    playersInFlames.push(...this.handleFlameInBlock(block));
    playersInFlames.push(...this.makeFlames(coordinateNew, direction, strength - 1));
    return playersInFlames;
  }

  /**
  * Clears all flames from arena.
  */
  clearAllFlames(): void {
    this.explodedBlocks.forEach((block: Block) => {
      block.setFlamesOn(false);
    });
    this.explodedBlocks = [];
  }

  /**
  * Moves the player if the move is legal.
  */
  movePlayer(player: Player, move: 0 | 1 | 2 | 3 | 4): void {
    if (this.isLegalMove(player.getLocation(), move)) {
      const blockOld: Block = this.getBlock(player.getLocation());
      const coordinateNew: Coordinate = this.getCoordinateAfterMove(player.getLocation(), move);
      const blockNew: Block = this.getBlock(coordinateNew);
      player.setLocation(coordinateNew);
      blockOld.removePlayer(player);
      blockNew.addPlayer(player);
    }
  }

  private getCoordinateAfterMove(coordinate, move: 0 | 1 | 2 | 3 | 4): Coordinate {
    let changeX: number = 0;
    let changeY: number = 0;

    if (move === 1) changeY--; // Up
    if (move === 2) changeX++; // Right
    if (move === 3) changeY++; // Down
    if (move === 4) changeX--; // Left

    return new Coordinate(coordinate.getX() + changeX, coordinate.getY() + changeY);
  }

  /**
  * Leaves a bomb if it's possible to leave a bomb to player's location.
  */
  leaveBomb(player: Player): Bomb {
    if (this.isLegalToLeaveBomb(player.getLocation())
      && player.isBombsLeft()) {
      const block: Block = this.getBlock(player.getLocation());
      const bomb: Bomb = new Bomb();
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
  bombsExplodedForRound(): void {
    this.arenaTable.forEach((row: Block[]) => {
      row.forEach((block: Block) => {
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
        const coordinate: Coordinate = new Coordinate(column, row);
        const block: Block = this.getBlock(coordinate);
        const player: Player = block.getFirstNotExplodedPlayer();
        if (block.isFlamesOn()) {
          columnText = '¤¤';
        } else if (player) {
          columnText = `${player.getPlayerNumber()}${block.isBomb() ? 'O' : player.getPlayerNumber()}`;
        } else if (block.isBomb()) {
          columnText = 'OO';
        } else {
          switch (block.getBlockType()) {
            case BlockType.FREE:
              columnText = '  ';
              break;
            case BlockType.TILE:
              columnText = '##';
              break;
            case BlockType.CONCRETE:
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
