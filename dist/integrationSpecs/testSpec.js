"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BombermanGame_1 = require("../src/logic/BombermanGame");
const Player_1 = require("../src/logic/Player");
const Ui_1 = require("../src/logic/Ui");
describe("2Make sure Bomberman game is working", () => {
    let bombermanGame;
    beforeAll(() => {
        const player1 = new Player_1.Player(1);
        const player2 = new Player_1.Player(2);
        const player3 = new Player_1.Player(3);
        const player4 = new Player_1.Player(4);
        bombermanGame = new BombermanGame_1.BombermanGame();
        bombermanGame.addPlayer(player1);
        player1.setUi(new Ui_1.Ui());
        bombermanGame.addPlayer(player2);
        player2.setUi(new Ui_1.Ui());
        bombermanGame.addPlayer(player3);
        player3.setUi(new Ui_1.Ui());
        bombermanGame.addPlayer(player4);
        player4.setUi(new Ui_1.Ui());
    }, 60000);
    //  it("by crea", function() {
    //    const ui: Ui = new Ui();
    //    ui.makeMove(new Arena(), new Coordinate(5,5));
    //
    //  }, 60000);
    it("by crea", function () {
        bombermanGame.startGame();
        expect(true).toBe(true);
    }, 60000);
});
//# sourceMappingURL=testSpec.js.map