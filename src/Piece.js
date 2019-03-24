import SPRITES from './sprites';
import { PIECE_TYPE, PIECE_MATRIX } from './constants';
import { gameOptions } from './options';

class Piece {
    currentScene = null;
    _position = 0;
    type = null;
    matrix = null;
    tiles = null;
    canMove = {
        left: true,
        right: true,
    };
    startX = 0;
    startY = 0;

    constructor(scene, startX, startY) {
        console.log('Hello Piece');
        this.currentScene = scene;
        this.startX = startX;
        this.startY = startY;

        this.createTiles();
        this.setRandomTypeAndPosition();
        this.initCoordinates(startX, startY);
    }

    createTiles = () => {
        console.log('Piece.createTiles');
        this.tiles = [];
        for (let i = 0; i < 4; i++) {
            const tile = this.currentScene.add.sprite(0, 0, SPRITES.TETROMINO_TILE.key);
            tile.setOrigin(0, 0);
            this.tiles.push(tile);
        }
    };

    setRandomTypeAndPosition = () => {
        console.log('Piece.setRandomTypeAndPosition');
        this.type = PIECE_TYPE[Phaser.Utils.Array.GetRandom(Object.keys(PIECE_TYPE))];
        this.matrix = PIECE_MATRIX[this.type];
        this.position = Math.floor(Math.random() * this.matrix.length);
    };

    initCoordinates = (originX, originY) => {
        console.log('Piece.initCoordinates');
        const x = originX - Math.min(...this.tiles.map(tile => tile.x));
        const y = originY - Math.min(...this.tiles.map(tile => tile.y));
        this.tiles.forEach(tile => {
            tile.x += x;
            tile.y += y;
        });
    };

    moveDown = () => {
        this.tiles.forEach(tile => {
            tile.y += gameOptions.tileSize;
        });
    };

    moveLeft = () => {
        console.log('Piece.moveLeft');
        if (this.canMove.left) {
            this.moveSide(-1);
        }
    };

    moveRight = () => {
        console.log('Piece.moveRight');
        if (this.canMove.right) {
            this.moveSide(+1);
        }
    };

    moveSide = direction => {
        this.tiles.forEach(tile => (tile.x += direction * gameOptions.tileSize));
    };

    rotate = (limitX, limitY) => {
        console.log('Piece.rotate');
        const originalX = Math.min(...this.tiles.map(tile => tile.x));
        const originalY = Math.min(...this.tiles.map(tile => tile.y));

        // Check if the next position of the piece will touch the ground
        const nextPos = this._position + 1 >= this.matrix.length ? 0 : this._position + 1;
        const tilesNbMap = [...Array(4).keys()];
        const maxYNextMatrix = Math.max(
            ...tilesNbMap.map(i => {
                return (
                    this.matrix[nextPos][i].y * gameOptions.tileSize +
                    originalY -
                    Math.min(...tilesNbMap.map(i => this.matrix[nextPos][i].y * gameOptions.tileSize))
                );
            })
        );
        if (maxYNextMatrix + gameOptions.tileSize > limitY) {
            console.log("CAN'T ROTATE");
            return;
        }

        // Get the next position
        this.position = nextPos;
        this.initCoordinates(originalX, originalY);

        // Check if the piece is outside the board on the right
        const maxTileX = Math.max(...this.tiles.map(tile => tile.x));
        const tooMuchX = maxTileX - limitX;
        if (tooMuchX >= 0) {
            const directionSizeToSlide = parseInt(tooMuchX / gameOptions.tileSize, 10) + 1;
            this.moveSide(-directionSizeToSlide);
        }
    };

    get position() {
        return this._position;
    }

    set position(pos) {
        this._position = pos >= this.matrix.length ? 0 : pos;
        this.tiles.forEach((tile, index) => {
            tile.x = this.matrix[this._position][index].x * gameOptions.tileSize;
            tile.y = this.matrix[this._position][index].y * gameOptions.tileSize;
        });
    }
}

export default Piece;
