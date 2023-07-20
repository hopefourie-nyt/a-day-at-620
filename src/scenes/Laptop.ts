import Phaser from "phaser";

export default class Laptop extends Phaser.Scene {
fist: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined
space: any;
constructor() {
    super("Laptop");
  }

  create() {
    const x = 300;
    const y = 0;

    //background
    this.add.image(350, 250, "laptop");
    //fist
    this.fist = this.physics.add.image(0, 0, 'big-fist')
    //fist physics
    this.fist.setVelocity(400, 0)
    this.fist.setBounce(1, 0)
	this.fist.setCollideWorldBounds(true)
       // key objects
    this.space = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );

    // Resume Scene Button
    const ResumeButton = this.add.text(100, 400, "Resume Scene", {color: '#FFFFFF'});
    ResumeButton.setInteractive();
    ResumeButton.on("pointerdown", () => {
      this.scene.resume("StandUp");
      this.scene.stop();
    });

    // Next Scene Button
    const NextButton = this.add.text(500, 400, "Next Scene", {color: '#FFFFFF'});
    NextButton.setInteractive();
    NextButton.on("pointerdown", () => {
      this.scene.start("Subway");
    });
  }
  update(): void {
    if (this.space.isDown){
        this.fist?.setVelocity(0, 600);
    }
    else if (this.fist?.y && this.fist.y > 42){
        console.log(this.fist?.y)
        this.fist?.setVelocity(0, -600);
    }else if (this.fist?.body.velocity.x == 0){
        this.fist?.setVelocity(400, 0);
    }
  }
}
