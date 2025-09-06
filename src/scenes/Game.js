import { Player } from "../gameObjects/player/Player";
import { Mob } from "../gameObjects/mobs/mob";
import { NovaCore } from "../gameObjects/items/NovaCore";

export class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(1, 2, 2);
    graphics.generateTexture("star", 2, 2);

    const stars = this.add.group({
      key: "star",
      repeat: 50,
      setXY: { x: 0, y: 0, stepX: 8 },
    });

    stars.children.iterate((star) => {
      star.y = Phaser.Math.Between(0, this.scale.height);
      star.x = Phaser.Math.Between(0, this.scale.width);
      star.speed = Phaser.Math.Between(0, 1);
    });

    this.stars = stars;

    this.scoreText = this.add.text(10, 10, "Score: 0", {
      fontSize: "16px",
      fill: "#fff",
    });
    this.scoreText.setFontFamily("'Press Start 2P'");

    this.bottomRightTexts = this.add
      .text(
        this.scale.width - 10,
        this.scale.height - 10,
        [
          "P - Pause/Resume",
          "Right Arrow Key - Move Right",
          "Left Arrow Key - Move Left",
        ],
        {
          fontSize: "12px",
          fill: "#fff",
        }
      )
      .setOrigin(1, 1);

    this.lives = 5;
    this.livesGroup = this.add.group();
    this.initPlayerLives();

    this.score = 0;
    this.Y_AXIS = -50;

    this.pauseText;
  }

  create() {
    this.player = new Player(
      this,
      this.scale.width / 2,
      this.scale.height - 100
    );

    this.mobGroup = this.physics.add.group();
    this.projectileGroup = this.physics.add.group();
    this.itemGroup = this.physics.add.group();

    this.spawnMobs();
    this.spawnItem();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    this.handleMobHitPlayer();

    this.fireBlasterCollision();

    this.explosionSFX = this.sound.add("explosion");
  }

  handleMobHitPlayer() {
    this.physics.add.overlap(
      this.player,
      this.mobGroup,
      () => {
        this.lives = 0;
        this.gameOver();
      },
      null,
      this
    );
  }

  fireBlasterCollision() {
    this.physics.add.overlap(
      this.projectileGroup,
      this.mobGroup,
      (projectile, mob) => {
        projectile.destroy();

        mob.takeDamage(projectile.damage);
        if (mob.isDead) {
          this.score += 10;
          this.scoreText.setText(`Score: ${this.score}`);
        }
      }
    );
  }

  initPlayerLives() {
    for (let i = 0; i < this.lives; i++) {
      const heart = this.add.image(20 + i * 40, 50, "life");
      heart.setScale(0.5);
      this.livesGroup.add(heart);
    }
  }

  removeLife() {
    if (this.lives > 0) {
      this.lives--;
      const heart = this.livesGroup.getChildren()[this.lives];
      heart.destroy();
    }

    if (this.lives <= 0) {
      this.gameOver();
    }
  }

  spawnItem() {
    const y = this.Y_AXIS;
    const second = 30; //every 20 seconds
    this.spawnEvent = this.time.addEvent({
      delay: 1000 * 30,

      loop: true,
      callback: () => {
        const core = new NovaCore(
          this,
          Phaser.Math.Between(50, this.scale.width - 50),
          y,
          "nova_core"
        );

        core.setVelocityY(100);

        this.physics.add.overlap(core, this.player, () => {
          this.sound.play("powerUp");
          core.applyEffect(this.player.fireBlaster);
          core.disableBody(true, true);
        });
      },
    });
  }

  spawnMobs() {
    const y = this.Y_AXIS;
    if (this.physics.world.isPaused) return;
    this.spawnEvent = this.time.addEvent({
      delay: 1500,
      loop: true,
      callback: () => {
        const dorque = new Mob(
          this,
          Phaser.Math.Between(50, this.scale.width - 50),
          y,
          "dorque",
          10
        );
        this.mobGroup.add(dorque);
        dorque.setVelocityY(90);

        if (this.score > 200) {
          if (!(Math.random() < 0.5)) return;
          const dorqueRed = new Mob(
            this,
            Phaser.Math.Between(50, this.scale.width - 50),
            y,
            "dorqueRed",
            30
          );
          this.mobGroup.add(dorqueRed);
          dorqueRed.setVelocityY(120);
        }

        if (this.score > 1200) {
          if (!(Math.random() < 0.3)) return;
          const dorquePurple = new Mob(
            this,
            Phaser.Math.Between(50, this.scale.width - 50),
            y,
            "dorquePurple",
            50
          );
          this.mobGroup.add(dorquePurple);
          dorquePurple.setVelocityY(180);
        }
      },
    });
  }

  update(time, delta) {
    this.stars.children.iterate((star) => {
      star.y += star.speed;

      if (star.y > this.scale.height) {
        star.y = 0; // reset to top
        star.x = Phaser.Math.Between(0, this.scale.width);
      }
    });

    this.observePlayerKeypress();
    this.playerFire();
    this.observeMobPassThrough();
  }

  gameOver() {
    this.explosionSFX.play();
    this.physics.pause();
    this.mobGroup.setVelocityY(0);
    this.projectileGroup.setVelocityY(0);
    this.time.delayedCall(2000, () => {
      this.scene.start("GameOver", { score: this.score });
    });
    this.playerDeathAnimation();
  }

  pauseGame() {
    this.time.timeScale = 0;
    this.physics.pause();
    this.showPauseText();
  }
  resumeGame() {
    this.time.timeScale = 1;
    this.physics.resume();
    this.pauseText.destroy();
  }

  showPauseText() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    this.pauseText = this.add
      .text(centerX, centerY, "PAUSED", {
        fontSize: "64px",
        fill: "#ffffffff",
      })
      .setOrigin(0.5);
    this.pauseText.setFontFamily('"Press Start 2P"');
  }

  playerDeathAnimation() {
    this.player.setVisible(false);
    this.player.setActive(false);
    const testExplosion = this.add.sprite(
      this.player.x,
      this.player.y,
      "velox_explode"
    );
    testExplosion.setScale(2);
    testExplosion.play("velox_explode");
  }

  playerFire() {
    this.player.triggerFireBlaster();
  }

  observePlayerKeypress() {
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    } else {
      this.player.idle();
    }

    if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
      if (this.physics.world.isPaused) {
        this.resumeGame();
      } else {
        this.pauseGame();
      }
    }
  }

  observeMobPassThrough() {
    this.mobGroup.children.each((mob) => {
      if (mob.y > this.scale.height + 50) {
        this.removeLife();
        mob.destroy();
      }
    });
  }
}
