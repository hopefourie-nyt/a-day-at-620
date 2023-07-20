import Phaser from "phaser";

export default class Laptop extends Phaser.Scene {
fist: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined
charge: number;
space: any;
playerImageKey: any;
punching: boolean;
bugs: number;
constructor() {
    super("Laptop");
    this.charge = 0;
    this.punching = true;
    this.bugs = 0
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
    this.fist = this.physics.add.image(0, -170, 'big-fist')
    //fist physics
    this.fist.setVelocity(400, 0)
    this.fist.setBounce(1, 0)

    //fist bounds
    const left_zone = this.add.zone(-30, 0, 100, 1000);
    this.physics.world.enable(left_zone, 1);
    const right_zone = this.add.zone(680, 0, 10, 1000);
    this.physics.world.enable(right_zone, 1);
    const bottom_zone = this.add.zone(0, 500, 10000, 100);
    this.physics.world.enable(bottom_zone, 1);
    const top_zone = this.add.zone(0, -440, 10000, 100);
    this.physics.world.enable(top_zone, 1);
    this.physics.add.collider(this.fist, left_zone);
    this.physics.add.collider(this.fist, right_zone);
    this.physics.add.collider(this.fist, bottom_zone);
    this.physics.add.overlap(this.fist, top_zone);

    //bug bounds
    const bug_zones: { [name: string]: any }  =  {
      "left": this.add.zone(30, 0, 100, 1000),
      "right": this.add.zone(620, 0, 10, 1000),
      "bottom": this.add.zone(0, 480, 10000, 100),
      "top": this.add.zone(0, 25, 10000, 100)
    };
    for (const k in bug_zones){
      this.physics.world.enable(bug_zones[k], 1);
    }

    //bugs 
    const blockGroup = this.physics.add.group();
    for (let row = 0; row < 5; row++) {
      for (let i = 0; i < 7; i++) {
        if (Math.random() > .4) {
          blockGroup.create((130 + i * 90) % 620, 150 + 65 * row, "fly");
          this.bugs += 1;
      }}
        
    }
    blockGroup.setVelocity(100,100);
    blockGroup.scaleXY(1.5,1.5);

    for (const block of blockGroup.getChildren()) {
      const body = <Phaser.Physics.Arcade.Body> block.body;
      this.physics.add.existing(block);
      body.setBounce(1.1,1.1);
      body.setMaxVelocity(1000)
      for (const k in bug_zones){
        this.physics.add.collider(bug_zones[k], block);
      }
      body.setAcceleration(Math.random() * 70, Math.random() * 70);
      this.physics.add.collider(this.fist, block, () => {
        if (this.punching){
          block.destroy();
          this.bugs+= -1
        }
      });
    }

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
      this.scene.start("Snacks", {playerImageKey: this.playerImageKey});
    });
  }
  update(): void {
    if (this.space.isDown){
      this.punching = false;

      if (this.charge < 300){
        this.charge += 1;
        this.fist?.setVelocity(0, -25);
      } else {
        this.fist?.setVelocity(0, 0);
      }
    } else if (this.charge != 0){
      this.fist?.setVelocity(0, (this.charge/2) ** 2);
      //this.fist?.setAccelerationY(-2);
      this.charge = 0
      this.punching = true;
    } 
    else if (this.fist?.body.touching.up && !this.punching){
      this.fist?.setVelocity(400, 0);

    }
    else if (this.fist?.body.touching.down) {
      this.fist?.setVelocity(0, -600);
      this.punching = false;
    }
    console.log(this.bugs);
    if (this.bugs < 1){
      this.scene.resume("StandUp");
      this.scene.stop();
    }

  }
}
