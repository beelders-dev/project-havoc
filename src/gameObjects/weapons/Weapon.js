export class Weapon {
  constructor(scene, damage, cooldown) {
    this.scene = scene;

    this.baseDmg = damage;
    this.baseCooldown = cooldown;

    this.damage = damage;
    this.cooldown = cooldown;
    this.lastFired = 0;
  }

  canFire() {
    const now = Date.now();
    return now - this.lastFired >= this.cooldown * 1000;
  }

  fire(x, y) {
    if (this.canFire()) {
      this.lastFired = Date.now();
      this.onFire(x, y);
    }
  }

  onFire(x, y) {}

  applyCooldownBoost(multiplier, duration) {
    this.cooldown = this.baseCooldown * multiplier;

   
    console.log(`Attack Rate: ${this.cooldown}`);

    //reset
    this.scene.time.delayedCall(duration, () => {
      this.cooldown = this.baseCooldown;
    });

     console.log(`Attack Rate Reset: ${this.cooldown}`);
  }

  applyDamageBoost(multiplier, duration) {
    this.damage = this.baseDmg * multiplier;

    //reset
    this.scene.time.delayedCall(duration, () => {
      this.damage = this.baseDmg;
    });
  }
}
