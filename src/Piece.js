import SPRITES from './sprites';
import { PIECE_TYPE, PIECE_MATRIX } from './constants';
import { gameOptions } from './options';

class Piece {
  currentScene = null;
  position = null;
  type = null;
  matrix = null;
  tiles = null;

  constructor(scene) {
    console.log('Hello Piece');
    this.currentScene = scene;

    this.createTiles();
    this.setRandomTypeAndPosition();
    this.shapePiece();
  }

  createTiles = () => {
    console.log('Piece.createTiles');
    this.tiles = [];
    for (let i = 0; i < 4; i++) {
      const tile = this.currentScene.add.sprite(
        0,
        0,
        SPRITES.TETROMINO_TILE.key
      );
      tile.setOrigin(0, 0);
      this.tiles.push(tile);
    }
  };

  setRandomTypeAndPosition = () => {
    console.log('Piece.setRandomTypeAndPosition');
    this.type =
      PIECE_TYPE[Phaser.Utils.Array.GetRandom(Object.keys(PIECE_TYPE))];
    this.matrix = PIECE_MATRIX[this.type];
    this.position = Math.floor(Math.random() * this.matrix.length);
  };

  shapePiece = () => {
    console.log('Piece.shapePiece');
    this.tiles.forEach((tile, index) => {
      tile.x = this.matrix[this.position][index].x * gameOptions.tileSize;
      tile.y = this.matrix[this.position][index].y * gameOptions.tileSize;
    });
  };

  initCoordinates = (originX, originY) => {
    const x = originX - Math.min(...this.tiles.map(tile => tile.x));
    const y = originY - Math.min(...this.tiles.map(tile => tile.y));
    this.tiles.forEach(tile => {
      tile.x += x;
      tile.y += y;
    });
  };

  moveDown = () => {
    console.log('Piece.moveDown');
    this.tiles.forEach(tile => (tile.y += gameOptions.tileSize));
  };

  moveLeft = () => {
    console.log('Piece.moveLeft');
    this.moveSide(-1);
  };

  moveRight = () => {
    console.log('Piece.moveRight');
    this.moveSide(+1);
  };

  moveSide = direction => {
    this.tiles.forEach(tile => (tile.x += direction * gameOptions.tileSize));
  };

  rotate = () => {
    console.log('Piece.rotate');
    const nextPosition =
      this.position + 1 < this.matrix.length ? this.position + 1 : 0;
    this.position = nextPosition;

    const originalX = Math.min(...this.tiles.map(tile => tile.x));
    const originalY = Math.min(...this.tiles.map(tile => tile.y));
    this.shapePiece();
    this.initCoordinates(originalX, originalY);
  };
}

export default Piece;
