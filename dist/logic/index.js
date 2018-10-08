const BombermanGame = require('./src/BombermanGame');
const Player = require('./src/Player');
const player1 = new Player(1);
const player2 = new Player(2);
const player3 = new Player(3);
const player4 = new Player(4);
const bombermanGame = new BombermanGame();
bombermanGame.addPlayer(player1);
bombermanGame.addPlayer(player2);
bombermanGame.addPlayer(player3);
bombermanGame.addPlayer(player4);
bombermanGame.startGame();
//# sourceMappingURL=index.js.map