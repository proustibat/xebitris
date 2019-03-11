import { Scene } from 'phaser';
import SPRITES from '../assets/sprites';

export default class PlayGround extends Scene {
  constructor() {
    console.log('Hello PlayGround');
    super({ key: PlayGround.name });
  }

  preload() {
    console.log('PlayGround.preload');
    this.load.image(SPRITES.TETROMINO_TILE.key, SPRITES.TETROMINO_TILE.path);
  }

  create() {
    console.log('PlayGround.create');
    const tile = this.createTile();
  }

  createTile = () => {
    // TODO : don't add it to the current scene ? and pass the scene as an argument ?
    const tile = this.add.sprite(0, 0, SPRITES.TETROMINO_TILE.key);
    tile.setOrigin(0, 0);
    return tile;
  };
}
