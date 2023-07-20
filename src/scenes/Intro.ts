import Phaser from "phaser";
import { Character } from "../classes/character";
import { animateText } from "./helpers";

export default class Intro extends Phaser.Scene {
  fist: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined;
  space: any;
  player: any;
  taxi: Phaser.GameObjects.Image | undefined;
  constructor() {
    super("Intro");
  }

  create() {
    const x = 550;
    const y = 450;

    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 50;

    // Background
    this.add.image(350, 100, "nytb").setScale(1 / 2);

    // Textbox
    this.add.image(350, -50, "textbox");
    let text = this.add.text(
      105,
      165,
      "You've arrived at 620. Walk to the door to enter the building.",
      { color: "#000000", fontSize: "13px" }
    );

    animateText(text, 5);

    let door = this.add
      .sprite(350, 420, "elevator-door")
      .setScale(3 / 4)
      .setOrigin(0.5);
    this.physics.world.enableBody(door);

    this.player = new Character(this, x, y, "hope", 3, 4);

    this.physics.add.collider(this.player, door, () => {
      this.scene.start("ElevatorScene");
    });

    this.taxi = this.add.image(580, 450, "taxi").setScale(3 / 4);
    this.taxi.body = <Phaser.Physics.Arcade.Body>this.taxi.body;

    this.physics.world.enableBody(this.taxi);

    this.taxi.body.setVelocityX(-100);
  }
  update(): void {
    this.player?.update();
  }
}
