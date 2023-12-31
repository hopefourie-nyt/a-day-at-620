import Phaser from "phaser";
import { Snacker } from "../classes/snacker";

export default class Snacks extends Phaser.Scene {
  fist: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined;
  space: any;
  player: any;
  taxi: Phaser.GameObjects.Image | undefined;
  playerImageKey: any;
  constructor() {
    super("Snacks");
  }
  init(data: any) {
    this.playerImageKey = data.playerImageKey;
  }
  create() {

    // Background
    this.physics.world.setBounds(0, 0, 5000, 5000);
    this.add.rectangle(600, 2500, 5000, 5500, 0xe6fffc);
    this.add.rectangle(350, 5050, 5000, 200, 0xc8c8c8);
    // Top Floor
    let topFloor = this.add.rectangle(350, 3200, 5000, 200, 0xc8c8c8);
    this.physics.world.enableBody(topFloor);
    topFloor.body = <Phaser.Physics.Arcade.Body>topFloor.body;
    topFloor.body.setImmovable(true);
    let snack = this.add.image(2267, 3230, "snack").setOrigin(0.5);
    this.physics.world.enableBody(snack);
    snack.body = <Phaser.Physics.Arcade.Body>snack.body;
    snack.body.setImmovable(true);
    // Corridor
    const corridorGroup = this.physics.add.staticGroup();
    for (let i = 0; i < 100; i++) {
      let newX;
      if (this.playerImageKey === "julian") {
        newX = 220 + i * 18;
      } else {
        newX = 210 + i * 18;
      }
      let newY = 4990 - i * 17;
      let corridor = corridorGroup.create(newX, newY, "stair");
      corridor.flipX = true;
    }

    // Corridor 1
    const corridorGroup1 = this.physics.add.staticGroup();
    for (let i = 0; i < 100; i++) {
      let newX = 730 + i * 18;
      let newY = 4990 - i * 17;
      let corridor = corridorGroup1.create(newX, newY, "stair");
      corridor.flipX = true;
    }

    // Corridor 2
    const corridorGroup2 = this.physics.add.staticGroup();
    for (let i = 0; i < 100; i++) {
      let newX = -30 + i * 18;
      let newY = 4990 - i * 17;
      let corridor = corridorGroup2.create(newX, newY, "stair");
      corridor.flipX = true;
    }

    // Stairs
    const stairGroup = this.physics.add.staticGroup();
    for (let i = 0; i < 100; i++) {
      let newX = 470 + i * 18;
      let newY = 4990 - i * 17;
      let stair = stairGroup.create(newX, newY, "stair");
      stair.flipX = true;
    }

    this.player = new Snacker(this, 310, 4990, this.playerImageKey);
    this.physics.add.collider(this.player, stairGroup);
    this.physics.add.collider(this.player, corridorGroup);

    // Eric
    let eric = this.add
      .sprite(140, 4950, "eric")
      .setOrigin(0.5)
      .setScale(3 / 4);
    eric.body = <Phaser.Physics.Arcade.Body>eric.body;

    this.physics.world.enableBody(eric);

    eric.body.setVelocity(47.25, -41.6);

    // Sam
    let sam = this.add
      .sprite(640, 4950, "sam")
      .setOrigin(0.5)
      .setScale(3 / 4);
    sam.body = <Phaser.Physics.Arcade.Body>sam.body;

    this.physics.world.enableBody(sam);

    sam.body.setVelocity(39.4, -34.7);

    let camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setFollowOffset(0, 100);

    this.physics.add.overlap(this.player, snack, () => {
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          this.scene.launch("LongDay", {
            playerImageKey: this.playerImageKey,
            cupcake: true,
          });
          this.scene.pause();
        },
        loop: false,
      });
    });

    this.physics.add.overlap(sam, topFloor, () => {
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          this.scene.launch("LongDay", {
            playerImageKey: this.playerImageKey,
            cupcake: false,
          });
          this.scene.pause();
        },
        loop: false,
      });
    });

    this.physics.add.overlap(eric, topFloor, () => {
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          this.scene.launch("LongDay", {
            playerImageKey: this.playerImageKey,
            cupcake: false,
          });
          this.scene.pause();
        },
        loop: false,
      });
    });

    this.add.rectangle(310, 5070, 620, 70, 0x5f9a93).setOrigin(0.5);
    this.add.rectangle(310, 5070, 600, 50, 0x84b7b1).setOrigin(0.5);
    this.add
      .text(
        310,
        5070,
        "Alternate the up and right arrow keys to race up the stairs",
        { color: "#000000" }
      )
      .setOrigin(0.5);
  }
  update(): void {
    this.player?.update();
  }
}
