import Phaser from "phaser";
import { Character } from "../classes/character.js";
import { animateText } from "./helpers.js";

export default class StandUp extends Phaser.Scene {
  player: Character | undefined;
    playerImageKey: any;
  constructor() {
    super("StandUp");
  }
  init(data: any) {
    this.playerImageKey = data.playerImageKey 
  }

  create() {
    const x = 650;
    const y = 250;
    const map = this.make.tilemap({ key: "room_map" });
    const room_tile = map.addTilesetImage("conference-room", "conference-room");
    const desk_tile = map.addTilesetImage("desk", "desk");
    const world_layer = map.createLayer("world", room_tile);

    let chair3 = this.add.image(400, 200, "chair");
    chair3.flipX = true;
    let chair4 = this.add.image(550, 200, "chair");
    chair4.flipX = true;
    this.add.image(200, 200, "chair");

    const below_layer = map.createLayer("below", desk_tile);
    const above_layer = map.createLayer("above", desk_tile);

    below_layer.setCollisionByProperty({ colides: true });
    above_layer.setCollisionByProperty({ colides: true });
    world_layer.setCollisionByProperty({ colides: true });
    above_layer.setDepth(10);

    let myChair = this.add.image(70, 300, "chair");
    this.physics.world.enableBody(myChair);
    myChair.body = <Phaser.Physics.Arcade.Body>myChair.body;
    myChair.body.setImmovable(true);

    this.add.image(250, 370, "chair");
    let chair2 = this.add.image(500, 370, "chair");
    chair2.flipX = true;
    this.add.sprite(215, 165, "eric").setScale(7/8)
    let sam = this.add.sprite(385, 165, "sam").setScale(3/4)
    sam.flipX = true

    this.player = new Character(this, x, y, this.playerImageKey);
    this.physics.add.collider(this.player, below_layer);
    this.physics.add.collider(this.player, world_layer);
    this.physics.add.collider(this.player, above_layer);

    // Textbox
    this.add.image(350, 250, "textbox");
    let text = this.add.text(
      105,
      465,
      "Finally, you got into the office. Sit down to start squashing bugs.",
      { color: "#000000", fontSize: "11.5px" }
    );
    animateText(text)

    this.physics.add.overlap(this.player, myChair, () => {
        this.time.addEvent({
          delay: 1500,
          callback: () => {
            this.scene.launch("Laptop", {playerImageKey: this.playerImageKey});
            this.scene.pause();
          },
          loop: false,
        });
      });
    // // Next Scene Button
    // const panelButton = this.add.text(400, 100, "panel Scene");
    // panelButton.setInteractive();
    // panelButton.on("pointerdown", () => {
    //     this.scene.launch("Laptop");
    //     this.scene.pause();
    // });

    // // Next Scene Button
    // const nextButton = this.add.text(100, 100, "Next Scene");
    // nextButton.setInteractive();
    // nextButton.on("pointerdown", () => {
    //     this.scene.start("Subway", {playerImageKey: this.playerImageKey});
    // });
  }
  update(): void {
    this.player?.update();
  }
}
