import { BombermanGame } from './BombermanGame';
import { Player } from './Player';
import { Ui } from './Ui';

const player1 = new Player(1);
player1.setUi(new Ui());

const player2 = new Player(2);
player2.setUi(new Ui());

const player3 = new Player(3);
player3.setUi(new Ui());

const player4 = new Player(4);
player4.setUi(new Ui());

const bombermanGame = new BombermanGame();
bombermanGame.addPlayer(player1);
bombermanGame.addPlayer(player2);
bombermanGame.addPlayer(player3);
bombermanGame.addPlayer(player4);

bombermanGame.startGame();
