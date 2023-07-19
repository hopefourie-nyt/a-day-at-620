import Phaser from "phaser";
import { Character } from "../classes/character.js";

export default class ElevatorScene extends Phaser.Scene {
  player: Character | undefined;
  constructor() {
    super("ElevatorScene");
  }

  create() {
    const x = 300;
    const y = 350;

    this.add.image(350, 250, "elevators");

    const map = this.make.tilemap({ key: "elevators_map" });
    const tileset = map.addTilesetImage("elevators_1", "elevators_1");
    const belowLayer = map.createLayer("below player", tileset);
    belowLayer.setCollisionByProperty({ collides: true });
    this.player = new Character(this, x, y, "julian");
    this.add.image(350, 250, "textbox")
	this.add.text(110, 465, "Good Morning! Approach the elevator button panel to get your day started", {color: "#000000"})


    const nextButton = this.add.text(100, 100, "Next Scene");
    nextButton.setInteractive();
	nextButton.on('pointerdown', () => { this.scene.start('StandUp') });

    this.physics.add.collider(this.player, belowLayer);

  }
  update(): void {
    this.player?.update();
  }
}
