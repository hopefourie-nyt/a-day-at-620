import Phaser from "phaser";
import { Character } from "../classes/character.js";

export default class ElevatorScene extends Phaser.Scene {
  player: Character | undefined;
  constructor() {
    super("ElevatorScene");
  }

  create() {
    const x = 340;
    const y = 200;

// Background
    this.add.image(350, 250, "elevators");

    // Tilemap
    const map = this.make.tilemap({ key: "elevators_map" });
    const tileset = map.addTilesetImage("elevators_1", "elevators_1");
    const belowLayer = map.createLayer("below player", tileset);
    const portals_layer = map.createLayer("portals", tileset);

    belowLayer.setCollisionByProperty({ collides: true });
    portals_layer.setCollisionByProperty({collides: true});
    this.player = new Character(this, x, y, "julian");
    this.add.image(350, 250, "textbox")
	  this.add.text(110, 465, "Good Morning! Approach the elevator button panel to get your day started", {color: "#000000"})

	// Textbox
    this.add.image(350, 250, "textbox");
    this.add.text(
      105,
      465,
      "Good Morning! Approach the elevator button panel to get your day started",
      { color: "#000000", fontSize: "11.5px" }
    );

	// Panel Scene Button
    const panelButton = this.add.text(300, 100, "panel Scene");
    panelButton.setInteractive();
    panelButton.on("pointerdown", () => {
      this.scene.launch("ElevatorPanel")
	  this.scene.pause()
    });
	
	// Next Scene Button
    const nextButton = this.add.text(100, 100, "Next Scene");
    nextButton.setInteractive();
	  nextButton.on('pointerdown', () => { this.scene.start('StandUp') });

    //this.physics.add.collider(this.player, belowLayer);
    this.physics.add.collider(this.player, portals_layer, () => { this.scene.start('StandUp') });

  }
  update(): void {
    this.player?.update();
  }
}
