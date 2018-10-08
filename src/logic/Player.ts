import { Coordinate } from './Coordinate';
import { PlayerMove } from './Player';
import { Ui } from './Ui'
import { Arena } from './Arena'

export class Player {

  private coordinate: Coordinate;
  private playerNumber: number;
  private ui: Ui;
  private exploded: boolean = false;
  private bombAmount: number = 2;

  constructor(playerNumber: number) {
    this.playerNumber = playerNumber;
  }

  setUi(ui: Ui) {
    this.ui = ui;
  };

  setExploded(): void {
    this.exploded = true;
  }

  isExploded(): boolean {
    return this.exploded;
  }

  setLocation(coordinate: Coordinate) {
    this.coordinate = coordinate;
  }

  getLocation(): Coordinate {
    return this.coordinate;
  }

  decreaseBombAmount(): void {
    this.bombAmount--;
  }

  increaseBombAmount(): void {
    this.bombAmount++;
  }

  isBombsLeft(): boolean {
    return this.bombAmount > 0;
  }

  getPlayerNumber(): number {
    return this.playerNumber;
  }

  getMove(arena: Arena): PlayerMove {
    console.log('Player ' + this.getPlayerNumber() + ' move');
    //return { direction: 1, leaveBomb: true }
    return this.ui.makeMove(arena, this.coordinate);
  }
}

/**
* Interface for player move. Contains possible walking direction and possible
* request to leave a bomb.
*/
export interface PlayerMove {
  direction: 0 | 1 | 2 | 3 | 4;
  leaveBomb: boolean;
}
