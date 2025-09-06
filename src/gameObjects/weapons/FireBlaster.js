import { Weapon } from "./Weapon";

export class FireBlaster extends Weapon {
  static STATS = {
    damage: 10,
    cooldown: 0.3,
  };

  constructor(scene) {
    super(
      scene,

      FireBlaster.STATS.damage,
      FireBlaster.STATS.cooldown
    );
    this.damage = FireBlaster.STATS.damage;
  }

  onFire(player) {
    const fireBlast = this.scene.physics.add.sprite(
      player.x,
      player.y - 50,
      "fireBlast"
    );
    fireBlast.damage = this.damage;
    this.scene.projectileGroup.add(fireBlast);
    fireBlast.setScale(0.09);
    fireBlast.setVelocityY(-500);

    if (!this.scene.physics.world.isPaused) {
      this.scene.sound.play("fire", { volume: 0.3 });
    }
  }
}
