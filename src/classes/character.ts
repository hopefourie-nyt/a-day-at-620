import Phaser from "phaser";

export class Character extends Phaser.GameObjects.Sprite {
  cursors: any;
  facingLeft: boolean;
  constructor(scene: any, x: number, y: number, texture: string, scaleX:number = 11, scaleY:number =16) {
    super(scene, x, y, texture);

    // Making the homie
    this.setTexture(texture);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    let guy = <Phaser.Physics.Arcade.Body>this.body;

    // Player Config
    this.facingLeft = false;
    this.setScale(scaleX / scaleY);
    guy.setGravityY(0);
    guy.setCollideWorldBounds(true);

    //Method calls for creation
    this.init();
    this.create();
  }

  init() {
    //Declarations
    this.cursors;
  }

  create() {
    // Create Input Event
    this.cursors = this.scene.input.keyboard;

    // key objects
    this.cursors.keyobj_up = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );
    this.cursors.keyobj_down = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.cursors.keyobj_left = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.cursors.keyobj_right = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.cursors.keyobj_enter = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
  }

  update() {
    let guy = <Phaser.Physics.Arcade.Body>this.body;
    // Move Left
    if (this.cursors.keyobj_left.isDown) {
      guy.setVelocityX(-100);
      if (!this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = true;
      }
      // Move Right
    } else if (this.cursors.keyobj_right.isDown) {
      guy.setVelocityX(100);
      if (this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = false;
      }
    } else if (this.cursors.keyobj_up.isDown) {
      guy.setVelocityY(-100);
    } else if (this.cursors.keyobj_down.isDown) {
      guy.setVelocityY(100);

      // Idle
    } else {
      guy.setVelocityX(0);
      guy.setVelocityY(0);
    }
  }
}
