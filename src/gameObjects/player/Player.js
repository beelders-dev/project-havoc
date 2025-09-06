import { Beam } from "../projectiles/Beam";
import { FireBlaster } from "../weapons/FireBlaster";
import { PulseCannon } from "../weapons/PulseCannon";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "velox");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setDisplaySize(64, 64);

    this.fireBlaster = new FireBlaster(scene);

  }

  moveLeft() {
    this.setVelocityX(-700);
  }
  moveRight() {
    this.setVelocityX(700);
  }
  idle() {
    this.setVelocityX(0);
  }

  triggerPulseCannon() {
    this.pulseCannon.fire(this);
  }

  triggerFireBlaster() {
    this.fireBlaster.fire(this);
  }


}
