import * as Phaser from 'phaser';
import PlayGame from './scenes/PlayGame';
import { gameOptions } from './options';

export default class App {
  gameConfig = null;
  game = null;

  constructor() {
    this.gameConfig = {
      type: Phaser.AUTO,
      backgroundColor: 0xecf0f1,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'xebitris-game',
        width: gameOptions.width,
        height: gameOptions.width * gameOptions.aspectRatio
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 }
        }
      },
      scene: [PlayGame]
    };

    this.game = new Phaser.Game(this.gameConfig);
  }
}
