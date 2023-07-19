import Phaser from "phaser";
import { Character } from "../classes/character.js";

export default class Laptop extends Phaser.Scene {
  player: Character | undefined;
  constructor() {
    super("Laptop");
  }

  create() {
    const x = 650;
    const y = 250;
    this.add.image(350, 150, "laptop");
    
    // Resume Scene Button
    const ResumeButton = this.add.text(550, 450, "Resume Scene", {
      color: "000000",
    });
    ResumeButton.setInteractive();
    ResumeButton.on("pointerdown", () => {
      this.scene.resume("ElevatorScene");
      this.scene.stop();
    });
  }
  update(): void {
    this.player?.update();
  }
}
