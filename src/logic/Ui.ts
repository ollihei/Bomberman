import { PlayerMove } from './Player';
import { Arena } from './Arena';
import { Coordinate } from './Coordinate';
import * as safeEval from 'safe-eval';

/**
* Class for Ui object.
*/
export class Ui {

  private doNothingMove: PlayerMove = { direction: 0, leaveBomb: false };
  private uiStore;

  private jsCode: string;

  makeMove(arena: Arena, location: Coordinate): PlayerMove {
    const context: any = {
      uiArena: arena.getUiArena(),
      location: location,
      uiStore: this.uiStore
    };
    const code = ' { direction: 1, leaveBomb: true }';
    const playerMove: PlayerMove = safeEval(code, context);
    if (!playerMove || !playerMove.leaveBomb || !playerMove.direction) {
      return this.doNothingMove;
    }
    return playerMove;
  }
}
