import { BlockType } from './BlockType';
import { Player } from './Player';
import { Bomb } from './Bomb';
import { Coordinate } from './Coordinate';

export class Block {

  private type: number;
  private coordinate: Coordinate;
  private players: Player[] = [];
  private bomb: Bomb;
  private makeFree: boolean;
  private flamesOn: boolean = false;

  constructor(coordinate: Coordinate, type: number) {
    this.coordinate = coordinate;
    this.type = type;
  }

  getPlayers(): Player[] {
    return this.players;
  }

  /**
  * Returns the first not exploded player. If there are no players or there
  * are only exploded players then null is returned.
  */
  getFirstNotExplodedPlayer(): Player {
    const playersNotExploded: Player[] = this.players
      .filter((player: Player) => !player.isExploded());
    return playersNotExploded.length > 0 ? playersNotExploded[0] : null;
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  removePlayer(player: Player): void {
    this.players = this.players
      .filter((playerInArray: Player) => playerInArray !== player);
  }

  setFlamesOn(flamesOn: boolean): void {
    this.flamesOn = flamesOn;
  }

  isFlamesOn(): boolean {
    return this.flamesOn;
  }

  isConcrete(): boolean {
    return this.type === BlockType.CONCRETE;
  }

  setToBeMadeFree(): void {
    this.makeFree = true;
  }

  isToBeMadeFree(): boolean {
    return this.makeFree;
  }

  isTile(): boolean {
    return this.type === BlockType.TILE;
  }

  setFree(): void {
    this.type = BlockType.FREE;
  }

  isFree(): boolean {
    return this.type === BlockType.FREE;
  }

  setBomb(bomb: Bomb): void {
    this.bomb = bomb;
  }

  removeBomb(): void {
    this.bomb = null;
  }

  isBomb(): boolean {
    return !!this.bomb;
  }

  getBomb() {
    return this.bomb;
  }

  getCoordinate() {
    return this.coordinate;
  }

  setBlockType(type): void {
    this.type = type;
  }

  getBlockType(): number {
    return this.type;
  }
}
