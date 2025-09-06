export class Mob extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = "dorque", health = 100) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.health = health;
    this.isDead = false;
    this.flyAnim = `${texture}_fly`;
    this.deathAnim = `${texture}_splat`;

    this.playFlyAnimation();
    this.setDisplaySize(64, 64);
  }

  takeDamage(amount) {
    this.health -= amount;

    this.scene.tweens.add({
      targets: this,
      tint: { from: 0xffffff, to: 0x0000ff },
      duration: 50,
      yoyo: true,
      repeat: 1,
    });

    if (this.health <= 0) {
      this.setIsDead(true);
      this.scene.sound.play("mobDeath");
      this.body.enable = false;
      this.setVelocity(0);

      this.play(this.deathAnim);

      this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.destroy();
      });
    }
  }

  playFlyAnimation() {
    this.play(this.flyAnim);
  }

  setIsDead(bool) {
    this.isDead = bool;
  }
}
