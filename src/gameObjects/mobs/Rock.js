export class Rock extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture = '', speed = 50) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setVelocity(x, y);
        
    }
}