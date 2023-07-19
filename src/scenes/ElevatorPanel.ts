import Phaser from "phaser";
import { Character } from "../classes/character.js";

export default class ElevatorPanel extends Phaser.Scene {
  player: Character | undefined;
  constructor() {
    super("ElevatorPanel");
  }

  create() {
    const x = 250;
    const y = 350;
    this.add.image(350, 250, "panel");

    const smallBounds = new Phaser.Geom.Rectangle(70, 50, 560, 380);

    this.player = new Character(this, x, y, "hope", 1, 2);
    const bodyody = <Phaser.Physics.Arcade.Body> this.player.body;

    bodyody.customBoundsRectangle = smallBounds;

    // Resume Scene Button
    const ResumeButton = this.add.text(100, 100, "Resume Scene", {color: '000000'});
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
