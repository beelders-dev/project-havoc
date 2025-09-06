export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  preload() {}

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    const heading = this.add
      .text(centerX, centerY - 50, "Project: H.A.V.O.C.", {
        fontSize: "50px",
        fill: "#fff",
      })
      .setOrigin(0.5);

    const subHeading = this.add
      .text(centerX, centerY + 10, "Hostile Assault Vector Obliteration Campaign", {
        fontSize: "15px",
        fill: "#fff",
      })
      .setOrigin(0.5);

    heading.setFontFamily('"Press Start 2P"');
    subHeading.setFontFamily('"Press Start 2P"');

    // Restart key
    const start = this.add
      .text(centerX, centerY + 120, "Press Space to Start", {
        fontSize: "24px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: start,
      alpha: 0, // fade to transparent
      duration: 1000, // half a second
      yoyo: true, // fade back in
      repeat: -1, // loop forever
    });

    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.scene.start("Preloader");
    }
  }
}
