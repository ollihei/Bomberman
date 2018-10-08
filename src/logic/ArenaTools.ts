import { BlockType } from './BlockType';
import { Block } from './Block';

export class ArenaTools {

  public static fillRowWithSymbol = function(arenaTable, rowId, symbol) {
    for (var i = 0; i < arenaTable[rowId].length; i++) {
      arenaTable[rowId][i].setBlockType(symbol);
    }
  }


  public static fillColumnWithSymbol = function(arenaTable, columnId, symbol) {
    for (var i = 0; i < arenaTable.length; i++) {
      arenaTable[i][columnId].setBlockType(symbol);
    }
  }
  /**
   * Adds tiles to arena randomly. Leave players' starting points and the tiles next to them empty.
   */
  public static addRandomTiles = function(arenaTable: Block[][], tileProbability: number) {
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
        if (Math.random() < tileProbability) arenaTable[row][column].setBlockType(BlockType.TILE);
      }
    }
  }
}
