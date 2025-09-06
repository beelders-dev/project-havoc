export class Beam extends Phaser.GameObjects.Rectangle {
  constructor(scene, player) {
    const beamWidth = 5;
    const beamHeight = player.y + 60;
    const beamX = player.x;
    const beamY = player.y / 2;

    super(scene, beamX, beamY, beamWidth, beamHeight, 0x00ffff);

    scene.add.existing(this);
    scene.physics.add.existing(this, false);

    this.player = player;
    this.lifespan = 2000;
    this.createdAt = scene.time.now;
  }

  update(time) {
    this.x = this.player.x;

    this.height = this.player.y;
    this.y = this.player.y / 2;

    // Expire
    if (time - this.createdAt > this.lifespan) {
      this.destroy();
    }
  }
}
