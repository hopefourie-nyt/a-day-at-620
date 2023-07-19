import Phaser from "phaser";
import { Character } from "../classes/character.js";

export default class StandUp extends Phaser.Scene {
  player: Character | undefined;
  constructor() {
    super("StandUp");
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
    this.add.image(250, 200, "chair");

    const below_layer = map.createLayer("below", desk_tile);
    const above_layer = map.createLayer("above", desk_tile);

    below_layer.setCollisionByProperty({ colides: true });
    above_layer.setCollisionByProperty({ colides: true });
    world_layer.setCollisionByProperty({ colides: true });
    above_layer.setDepth(10);

    this.add.image(70, 300, "chair");

    this.add.image(250, 370, "chair");
    let chair2 = this.add.image(500, 370, "chair");
    chair2.flipX = true;

    this.player = new Character(this, x, y, "hope");
    this.physics.add.collider(this.player, below_layer);
    this.physics.add.collider(this.player, world_layer);
    this.physics.add.collider(this.player, above_layer);

    // Next Scene Button
    const nextButton = this.add.text(100, 100, "Next Scene");
    nextButton.setInteractive();
    nextButton.on("pointerdown", () => {
        this.scene.launch("Laptop");
        this.scene.pause();
    });
  }
  update(): void {
    this.player?.update();
  }
}
