import * as Phaser from 'phaser';
import BootGame from './scenes/BootGame';
import PlayGround from './scenes/PlayGround';
import { gameOptions } from './options';

class Game extends Phaser.Game {
  constructor() {
    const config = {
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
      scene: [BootGame, PlayGround]
    };

    super(config);
  }
}

export default Game;
