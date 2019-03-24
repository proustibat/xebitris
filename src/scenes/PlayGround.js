import { Scene } from 'phaser';
import SPRITES from '../sprites';
import Piece from '../Piece';
import { gameOptions } from '../options';
import { COLLIDES } from '../constants';

export default class PlayGround extends Scene {
    width = 0;
    height = 0;
    startX = 0;
    startY = 0;

    controls = null;
    pauseControl = null;

    speedInterval = gameOptions.speeds.normal;
    lastUpdate = 0;

    offTiles = null;

    lastSwipeUpTime = 0;

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
        this.width = gameOptions.tileSize * gameOptions.tileNbWidth;
        this.height = gameOptions.tileSize * gameOptions.tileNbHeight;
        this.startX = 0;
        this.startY = Math.floor((this.game.config.height - this.height) / 2);

        this.scale.lockOrientation(Phaser.Scale.LANDSCAPE);

        this.setBackrgound();

        this.createPiece();

        this.initPlayer();

        this.offTiles = [];
    }

    setBackrgound = () => {
        console.log('PlayGround.setBackrgound', this.height);
        const graphics = this.add.graphics();
        graphics.fillStyle(gameOptions.colors.playground, 1);
        graphics.fillRect(this.startX, this.startY, this.width, this.height);
    };

    createPiece = () => {
        console.log('PlayGround.createPiece');
        this.speedInterval = gameOptions.speeds.normal;
        this.piece = new Piece(this, this.startX + this.width / 2 - gameOptions.tileSize, this.startY);
    };

    initPlayer = () => {
        console.log('PlayGround.initPlayer');
        this.input.keyboard.on('keydown', this.handleKeyDown);
        this.input.keyboard.on('keyup', this.handleKeyUp);

        this.input.on('pointerup', this.handleSwipe);
    };

    handleKeyDown = e => {
        if (this.time.paused) {
            return;
        }
        switch (e.code) {
            case 'KeyA':
            case 'ArrowLeft':
                !this.willCollidesOffTiles(COLLIDES.LEFT) && this.piece.moveLeft();
                break;
            case 'KeyD':
            case 'ArrowRight':
                !this.willCollidesOffTiles(COLLIDES.RIGHT) && this.piece.moveRight();
                break;
            case 'KeyW':
            case 'ArrowUp':
                this.piece.rotate(this.startX + this.width, this.height + this.startY);
                break;
            case 'KeyS':
            case 'ArrowDown':
                this.speedInterval = gameOptions.speeds.fast;
                break;
        }

        this.isLegalPosition();
    };

    handleSwipe = e => {
        if (e.upTime - this.lastSwipeUpTime < gameOptions.swipeIntervalMin && this.lastSwipeUpTime !== 0) {
            return;
        }
        this.lastSwipeUpTime = e.upTime;
        const swipeTime = e.upTime - e.downTime;
        const fastEnough = swipeTime < gameOptions.swipeMaxTime;
        const swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        const swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        const longEnough = swipeMagnitude > gameOptions.swipeMinDistance;
        console.log(e.upTime);
        if (longEnough && fastEnough) {
            Phaser.Geom.Point.SetMagnitude(swipe, 1);
            if (swipe.x > gameOptions.swipeMinNormal && !this.willCollidesOffTiles(COLLIDES.RIGHT)) {
                this.piece.moveRight();
            }
            if (swipe.x < -gameOptions.swipeMinNormal && !this.willCollidesOffTiles(COLLIDES.LEFT)) {
                this.piece.moveLeft();
            }
            if (swipe.y > gameOptions.swipeMinNormal) {
                this.speedInterval =
                    this.speedInterval === gameOptions.speeds.fast
                        ? gameOptions.speeds.normal
                        : gameOptions.speeds.fast;
            }
            if (swipe.y < -gameOptions.swipeMinNormal) {
                this.piece.rotate(this.startX + this.width, this.height + this.startY);
            }
        }
    };

    handleKeyUp = e => {
        if (e.code === 'Space') {
            this.togglePause();
        }
        if (this.time.paused) {
            return;
        }
        switch (e.code) {
            case 'KeyS':
            case 'ArrowDown':
                this.speedInterval = gameOptions.speeds.normal;
                break;
        }
    };

    togglePause = () => {
        console.log('PlayGround.togglePause');
        this.time.paused = !this.time.paused;
    };

    update(time) {
        if (this.time.paused) {
            return;
        }
        if (this.lastUpdate === 0) {
            this.lastUpdate = time;
            return;
        }

        if (time - this.lastUpdate >= this.speedInterval) {
            this.lastUpdate = time;

            // The piece collides another piece that is laid on the ground
            if (this.willCollidesOffTiles(COLLIDES.DOWN)) {
                this.offTiles.push(...this.piece.tiles);
                this.createPiece();
                return;
            }

            // The piece is moving down normally at each interval
            this.piece.moveDown();
            this.isLegalPosition();
        }
    }

    isLegalPosition = () => {
        // The piece is on the ground
        const maxTileY = Math.max(...this.piece.tiles.map(tile => tile.y));
        const isOnTheGround = maxTileY + gameOptions.tileSize >= this.height + this.startY;
        if (isOnTheGround) {
            this.offTiles.push(...this.piece.tiles);
            this.createPiece();
        }

        // The piece is near one of the sides
        this.piece.canMove.left = Math.min(...this.piece.tiles.map(tile => tile.x)) > this.startX;
        this.piece.canMove.right =
            Math.max(...this.piece.tiles.map(tile => tile.x)) + gameOptions.tileSize < this.startX + this.width;
    };

    willCollidesOffTiles = collideDirection => {
        let deltaX = 0;
        let deltaY = 0;
        switch (collideDirection) {
            case COLLIDES.LEFT:
                deltaX = -gameOptions.tileSize;
                break;
            case COLLIDES.RIGHT:
                deltaX = gameOptions.tileSize;
                break;
            case COLLIDES.DOWN:
                deltaY = gameOptions.tileSize;
                break;
            default:
                break;
        }
        return this.piece.tiles.some(tile =>
            this.offTiles.some(offTile => offTile.x === tile.x + deltaX && offTile.y === tile.y + deltaY)
        );
    };
}
