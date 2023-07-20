import Phaser from "phaser";
import { Character } from "../classes/character.js";
import { animateText } from "./helpers.js";

export default class ElevatorScene extends Phaser.Scene {
  player: Character | undefined;
  playerImageKey: any;
  constructor() {
    super("ElevatorScene");
  }
  init(data: any) {
    this.playerImageKey = data.playerImageKey 
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
    portals_layer.setCollisionByProperty({ transition: true });
    this.player = new Character(this, x, y, this.playerImageKey);

    // Textbox
    this.add.image(350, -150, "textbox");
    let text = this.add.text(
      105,
      65,
      "Good Morning! Approach the elevator button panel to get your day started",
      { color: "#000000", fontSize: "11.5px" }
    );
    animateText(text);

    // // Next Scene Button
    // const nextButton = this.add.text(100, 100, "Next Scene");
    // nextButton.setInteractive();
    // nextButton.on("pointerdown", () => {
    //   this.scene.start("StandUp", {playerImageKey: this.playerImageKey});
    // });

    this.physics.add.collider(this.player, belowLayer);
    this.physics.add.collider(this.player, portals_layer, () => {
      this.time.addEvent({
        delay: 500,
        callback: () => {
          this.scene.launch("ElevatorPanel", {playerImageKey: this.playerImageKey});
          this.scene.pause();
        },
        loop: false,
      });
    });
  }
  update(): void {
    this.player?.update();
  }
}
