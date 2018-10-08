import { Player } from './Player';
import { BombermanLogic } from './BombermanLogic';

export class BombermanGame {

  private players: Player[];
  private bombermanLogic: BombermanLogic;

  constructor() {
    this.players = []
    this.bombermanLogic = new BombermanLogic();
  }

  addPlayer(player) {
    console.log('Added player ' + player.getPlayerNumber());
    this.players.push(player);
  }

  startGame() {
    console.log('Starting a new game');
    this.players.forEach(
      (player: Player) => this.bombermanLogic.addPlayer(player)
    );

    this.bombermanLogic.roundZero();

    for (var i = 0; i < 7; i++) {
      this.bombermanLogic.runRound();
    }
  }
}
