export class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.setPath("assets");
    this.load.audio("theme", "sfx/theme.wav");
  }

  create() {
    // this.sound.play("theme", { loop: true });
    this.scene.start("MainMenu");
  }
}
