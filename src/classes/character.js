import Phaser from "phaser";

export class Character extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, tesxture ) {
    super(scene, x, y, texture );


    // Making the homie
    this.play("idle");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Player Config
    this.setScale(x / y);
    this.body.setGravityY(450);
    this.body.setCollideWorldBounds(true);

    //Method calls for creation
    this.init();
    this.create();
  }

  init() {
    //Variables
    this.is_run = false;
    this.is_idle = false;
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
    // Move Left
    if (this.cursors.keyobj_left.isDown) {
      this.body.setVelocityX(-500);
      // Move Right
    } else if (this.cursors.keyobj_right.isDown) {
      this.body.setVelocityX(500);
    } else if (this.cursors.keyobj_up.isDown) {
      this.body.setVelocityY(500);
    } else if (this.cursors.keyobj_down.isDown) {
      this.body.setVelocityY(-500);

      // Idle
    } else {
        this.body.setVelocityX(0);

        this.anims.play("idle", true);
      }
    }
  }

