export class Coordinate {

  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getAsString(): string {
    return this.getX() + '-' + this.getY();
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
}
