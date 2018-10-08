import { Player } from './Player';
import { Coordinate } from './Coordinate';

export class Bomb {

  private strength: number;
  private exploded: boolean;
  private explodeInProgress: boolean;
  private timeToLive: number;
  private player: Player;
  private coordinate: Coordinate;

  constructor() {
    this.strength = 2;
    this.timeToLive = 5;
  }

  isExploded(): boolean {
    return this.exploded;
  }

  isExplodeInProgress(): boolean {
    return this.explodeInProgress;
  }

  setExplodeInProgress(): void {
    this.explodeInProgress = true;
  }

  setExploded(): void {
    this.exploded = true;
  }

  setPlayer(player: Player): void {
    this.player = player;
  }

  getPlayer(): Player {
    return this.player;
  }

  setCoordinate(coordinate: Coordinate): void {
    this.coordinate = coordinate;
  }

  getCoordinate(): Coordinate {
    return this.coordinate;
  }

  public getStrength() {
    return this.strength;
  }

  public decreaseTimeToLive() {
    this.timeToLive--;
  }

  public isTimeToExplode() {
    return this.timeToLive < 1;
  }
}
