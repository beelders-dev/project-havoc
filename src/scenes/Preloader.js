export class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  init() {}

  preload() {
    this.load.setPath("assets");
    this.load.image("space", "space.png");
    this.load.image("velox", "velox.png");
    this.load.image("fireBlast", "fire_projectile.png");
    this.load.image("life", "life.png");
    this.load.image("beam", "beam.png");

    this.load.audio("explosion", "sfx/explosion.wav");
    this.load.audio("fire", "sfx/fire_blast.wav");
    this.load.audio("mobDeath", "sfx/mob_death.wav");
    this.load.audio("powerUp", "sfx/power_up.wav");

    this.load.spritesheet("dorque", "Dorque.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("dorqueRed", "DorqueRed.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("dorquePurple", "DorquePurple.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("velox_explode", "velox_explosion.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("nova_core", "nova_core.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.anims.create({
      key: "dorque_fly",
      frames: this.anims.generateFrameNumbers("dorque", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "dorque_splat",
      frames: this.anims.generateFrameNumbers("dorque", { start: 2, end: 2 }),
      frameRate: 1,
      repeat: 0,
    });

    this.anims.create({
      key: "dorqueRed_fly",
      frames: this.anims.generateFrameNumbers("dorqueRed", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "dorqueRed_splat",
      frames: this.anims.generateFrameNumbers("dorqueRed", {
        start: 2,
        end: 2,
      }),
      frameRate: 1,
      repeat: 0,
    });

    this.anims.create({
      key: "dorquePurple_fly",
      frames: this.anims.generateFrameNumbers("dorquePurple", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "dorquePurple_splat",
      frames: this.anims.generateFrameNumbers("dorquePurple", {
        start: 2,
        end: 2,
      }),
      frameRate: 1,
      repeat: 0,
    });

    this.anims.create({
      key: "velox_explode",
      frames: this.anims.generateFrameNumbers("velox_explode", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "nova_core",
      frames: this.anims.generateFrameNumbers("nova_core", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

   

    this.scene.start("Game");
  }
}
