import { BombermanGame } from '../src/logic/BombermanGame';
import { Player } from '../src/logic/Player';
import { Ui } from '../src/logic/Ui';
import { Coordinate } from '../src/logic/Coordinate';
import { Arena } from '../src/logic/Arena';

describe("2Make sure Bomberman game is working", () => {
  let bombermanGame: BombermanGame;
  beforeAll(() => {
    const player1: Player = new Player(1);
    const player2: Player = new Player(2);
    const player3: Player = new Player(3);
    const player4: Player = new Player(4);
    bombermanGame = new BombermanGame();
    bombermanGame.addPlayer(player1);
    player1.setUi(new Ui());
    bombermanGame.addPlayer(player2);
    player2.setUi(new Ui());
    bombermanGame.addPlayer(player3);
    player3.setUi(new Ui());
    bombermanGame.addPlayer(player4);
    player4.setUi(new Ui());
  }, 60000);

  //  it("by crea", function() {
  //    const ui: Ui = new Ui();
  //    ui.makeMove(new Arena(), new Coordinate(5,5));
  //
  //  }, 60000);

  it("by crea", function() {
    bombermanGame.startGame();
    expect(true).toBe(true);
  }, 60000);
});
