export class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.finalScore = data.score || 0; // get score from Game scene
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    const gameOverText = this.add
      .text(centerX, centerY - 50, "GAME OVER", {
        fontSize: "64px",
        fill: "#ff0000",
      })
      .setOrigin(0.5);

    gameOverText.setFontFamily('"Press Start 2P"');

    this.add
      .text(centerX, centerY + 50, `Score: ${this.finalScore}`, {
        fontSize: "32px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    // Restart key
    const restart = this.add
      .text(centerX, centerY + 120, "Press Space to Restart", {
        fontSize: "24px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: restart,
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
