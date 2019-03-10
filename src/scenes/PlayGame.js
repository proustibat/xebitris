import { Scene } from 'phaser';

export default class PlayGame extends Scene {
  constructor() {
    super('PlayGame');
  }

  preload() {
    this.load.image('sky', 'assets/sprites/space3.png');
    this.load.image('logo', 'assets/sprites/logo.png');
    this.load.image('red', 'assets/sprites/red.png');
  }

  create() {
    this.add.image(1920 / 2, 1080 / 2, 'sky');

    const particles = this.add.particles('red');

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });

    const logo = this.physics.add.image(250, 190, 'logo');

    logo.setVelocity(200, 250);
    logo.setBounce(0.99, 0.99);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }
}
