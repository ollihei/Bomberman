import { Player, PlayerMove } from './Player';
import { Arena } from './Arena';
import { Bomb } from './Bomb';

export class BombermanLogic {

  private players: Player[] = [];
  private bombs: Bomb[] = [];
  private arena: Arena;
  private roundNumber: number;

  constructor() {
    this.players = [];
    this.arena = new Arena();
    this.roundNumber = 1;
  }

  addPlayer(player: Player) {
    this.players.push(player);
    this.arena.addPlayer(player);
  }

  roundZero() {
    console.log('Round 0');
    this.arena.print();
    console.log('');
  }

  runRound() {
    console.log('Round ' + this.roundNumber);

    this.bombs.forEach((bomb: Bomb) => {
      bomb.getPlayer().decreaseBombAmount();
    });

    const playerMoves: { player: Player, move: PlayerMove }[] = this.players.map(
      (player: Player) => {
        return {
          player: player,
          move: player.getMove(this.arena)
        }
      });

    playerMoves.forEach(
      (playerMovePart: { player: Player, move: PlayerMove }) => {
        this.arena.movePlayer(playerMovePart.player, playerMovePart.move.direction);
      });

    playerMoves.forEach(
      (playerMovePart: { player: Player, move: PlayerMove }) => {
        if (playerMovePart.move.leaveBomb) {
          const bomb: Bomb = this.arena.leaveBomb(playerMovePart.player);
          if (bomb) {
            this.bombs.push(bomb);
          }
        }
      });

    const explodedPlayers: Set<Player> = new Set<Player>();
    this.bombs.forEach((bomb: Bomb) => {
      bomb.decreaseTimeToLive();
      if (bomb.isTimeToExplode()) {
        this.arena.explodeBomb(bomb)
          .forEach((player: Player) => explodedPlayers.add(player));
        bomb.getPlayer().increaseBombAmount();
      }
    });

    this.arena.bombsExplodedForRound();

    explodedPlayers.forEach((player: Player) => {
      player.setExploded();
    });

    // Remove exploded bombs
    this.bombs = this.bombs.filter((bomb: Bomb) => {
      return !bomb.isExploded()
    });

    this.arena.print();
    this.arena.clearAllFlames();
    this.roundNumber++;

    const notExplodedPlayers: Player[] = this.players
      .filter((player: Player) => !player.isExploded());
    if (notExplodedPlayers.length === 0) {
      console.log('TIE');
    }
    if (notExplodedPlayers.length === 1) {
      console.log(`WINNER: ${notExplodedPlayers[0].getPlayerNumber()}`);
    }

    console.log('');
  }
}
