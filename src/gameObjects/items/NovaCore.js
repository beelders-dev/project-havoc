export class NovaCore extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = "nova_core") {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(32, 32);

    this.play("nova_core");

    this.scene.tweens.add({
      targets: this,
      tint: { from: 0xffffff, to: 0x0000ff },
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
  }

  applyEffect(weapon) {
    const duration = 5000;
    weapon.applyCooldownBoost(0.2, duration);
    this.displayUI(duration);
  }

  displayUI(duration) {
    this.displayText(duration);
    this.blinkUponCatch(duration);
  }

  displayText(duration) {
    const displayText = this.scene.add
      .text(10, 70, "Nova Core Effect: Attack rate x 4", {
        fontSize: "16px",
        fill: "#64c1ddec",
      })
      .setOrigin(0, 0);

    this.scene.time.delayedCall(duration, () => {
      displayText.destroy();
    });
  }

  blinkUponCatch(duration) {
    const playerBlink = this.scene.tweens.add({
      targets: this.scene.player,
      tint: { from: 0xffffff, to: 0x0000ff },
      duration: 200,
      yoyo: true,
      repeat: -1,
    });

    this.scene.time.delayedCall(duration, () => {
      playerBlink.stop();
      this.scene.player.clearTint(); // reset back to normal
    });
  }
}
