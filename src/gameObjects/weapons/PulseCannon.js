import { Weapon } from "./Weapon";
import { Beam } from "../projectiles/Beam";

export class PulseCannon extends Weapon {
  static STATS = {
    damage: 1000,
    cooldown: 10,
  };

  constructor(scene, player) {
    super(scene, PulseCannon.STATS.damage, PulseCannon.STATS.cooldown);
    this.player = player;
  }

  onFire(x, y) {
    const beam = new Beam(this.scene, this.scene.player);
    this.scene.beams.add(beam);
  }
}