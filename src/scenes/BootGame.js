import { Scene } from 'phaser';
import SPRITES from '../assets/sprites';
import PlayGround from './PlayGround';

export default class BootGame extends Scene {
  constructor() {
    console.log('Hello Intro');
    super({ key: BootGame.name });
  }

  preload() {
    console.log('Intro.preload');
    this.load.image(SPRITES.BACKGROUND.key, SPRITES.BACKGROUND.path);
    this.load.image(SPRITES.PARTICLE.key, SPRITES.PARTICLE.path);
    this.load.image(SPRITES.LOGO.key, SPRITES.LOGO.path);
  }

  create() {
    console.log('Intro.create');
    this.add.image(1920 / 2, 1080 / 2, SPRITES.BACKGROUND.key);

    const particles = this.add.particles(SPRITES.PARTICLE.key);

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });

    const logo = this.physics.add.image(250, 190, SPRITES.LOGO.key);

    logo.setVelocity(200, 250);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);

    this.input.keyboard.on('keydown_SPACE', () =>
      this.scene.start(PlayGround.name)
    );
  }
}
