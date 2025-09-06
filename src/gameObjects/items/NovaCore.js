import {FireBlaster} from "../weapons/FireBlaster";

export class NovaCore extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = "nova_core") {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(64, 64);

    this.play("nova_core");
  }

  applyEffect(weapon) {
    weapon.applyCooldownBoost(0.2, 5000);
  }
}
