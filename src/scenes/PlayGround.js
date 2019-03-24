import { Scene } from 'phaser';
import SPRITES from '../sprites';
import Piece from '../Piece';
import { gameOptions } from '../options';

export default class PlayGround extends Scene {
    width = 0;
    height = 0;
    startX = 0;
    startY = 0;

    controls = null;
    pauseControl = null;

    speedInterval = gameOptions.speeds.normal;
    lastUpdate = 0;

    offPieces = null;

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

        this.offPieces = [];
    }

    setBackrgound = () => {
        console.log('PlayGround.setBackrgound', this.height);
        const graphics = this.add.graphics();
        graphics.fillStyle(gameOptions.colors.playground, 1);
        graphics.fillRect(this.startX, this.startY, this.width, this.height);
    };

    createPiece = () => {
        console.log('PlayGround.createPiece');
        this.piece = new Piece(this);
        this.piece.initCoordinates(this.startX + this.width / 2 - gameOptions.tileSize, this.startY);
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
                this.piece.moveLeft();
                break;
            case 'KeyD':
            case 'ArrowRight':
                this.piece.moveRight();
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

        this.checkCollides();
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

    handleSwipe = e => {
        const swipeTime = e.upTime - e.downTime;
        const fastEnough = swipeTime < gameOptions.swipeMaxTime;
        const swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        const swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        const longEnough = swipeMagnitude > gameOptions.swipeMinDistance;
        if (longEnough && fastEnough) {
            Phaser.Geom.Point.SetMagnitude(swipe, 1);
            if (swipe.x > gameOptions.swipeMinNormal) {
                this.piece.moveRight();
            }
            if (swipe.x < -gameOptions.swipeMinNormal) {
                this.piece.moveLeft();
            }
            if (swipe.y > gameOptions.swipeMinNormal) {
                this.piece.moveDown();
            }
            if (swipe.y < -gameOptions.swipeMinNormal) {
                this.piece.rotate();
            }
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

        // The piece is moving down normally at each interval
        if (time - this.lastUpdate >= this.speedInterval) {
            this.lastUpdate = time;
            this.piece.moveDown();
            this.checkCollides();
        }
    }

    checkCollides = () => {
        // The tile is on the ground
        const maxTileY = Math.max(...this.piece.tiles.map(tile => tile.y));
        const isOnTheGround = maxTileY + gameOptions.tileSize >= this.height + this.startY;
        if (isOnTheGround) {
            this.offPieces.push(this.piece);
            this.createPiece();
        }

        // The tile is near one of the sides
        this.piece.canMove.left = Math.min(...this.piece.tiles.map(tile => tile.x)) > this.startX;
        this.piece.canMove.right =
            Math.max(...this.piece.tiles.map(tile => tile.x)) + gameOptions.tileSize < this.startX + this.width;
    };
}
