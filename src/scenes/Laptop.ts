import Phaser from "phaser";

export default class Laptop extends Phaser.Scene {
fist: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined
charge: number;
space: any;
playerImageKey: any;
punching: boolean;
constructor() {
    super("Laptop");
    this.charge = 0;
    this.punching = true;
  }
  init(data: any) {
    this.playerImageKey = data.playerImageKey 
  }

  create() {
    const x = 300;
    const y = 0;

    //background
    this.add.image(350, 250, "laptop");
    //fist
    this.fist = this.physics.add.image(0, -150, 'big-fist')
    //fist physics
    this.fist.setVelocity(400, 0)
    this.fist.setBounce(1, 0)
    //world edges
    const left_zone = this.add.zone(-30, 0, 100, 1000);
    this.physics.world.enable(left_zone, 1);
    const right_zone = this.add.zone(680, 0, 10, 1000);
    this.physics.world.enable(right_zone, 1);
    const bottom_zone = this.add.zone(0, 500, 10000, 100);
    this.physics.world.enable(bottom_zone, 1);
    const top_zone = this.add.zone(0, -450, 10000, 100);
    this.physics.world.enable(top_zone, 1);
    this.physics.add.collider(this.fist, left_zone);
    this.physics.add.collider(this.fist, right_zone);
    this.physics.add.collider(this.fist, bottom_zone);
    this.physics.add.overlap(this.fist, top_zone);

	  //this.fist.setCollideWorldBounds(true)
    // key objects
    this.space = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
    const blockGroup = this.physics.add.staticGroup();
    blockGroup.create(150, 150, "elevator-door");
    blockGroup.create(300, 150, "elevator-door");
    blockGroup.create(400, 150, "elevator-door");
    for (const block of blockGroup.getChildren()) {
      this.physics.add.existing(block);
      this.physics.add.collider(this.fist, block, () => block.destroy());
    }




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
      this.scene.start("Snacks", {playerImageKey: this.playerImageKey});
    });
  }
  update(): void {
    if (this.space.isDown){
      if (this.charge < 300){
        this.punching = true;
        this.charge += 1;
        this.fist?.setVelocity(0, -10);
      } else {
        this.fist?.setVelocity(0, 0);
      }
        //this.fist?.setVelocity(0, 600);
    } else if (this.charge != 0){
      this.fist?.setVelocity(0, (this.charge/2) ** 2);
      this.charge = 0
    } 
    else if (this.fist?.body.touching.up && !this.punching){
      this.fist?.setVelocity(400, 0);
    }
    else if (this.fist?.body.touching.down) {
      this.fist?.setVelocity(0, -600);
      this.punching = false;
      console.log("hi");
    }

  }
}
